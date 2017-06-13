'use strict'

const db = require('APP/db')
    , {User, Product, ProductItem, Category, CartItem, Order, OrderItem, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = { // add only seed items that don't have dependencies here
    users: users(),
    categories: categories()
  }
  // if they have dependencies invoke below with seeded (order matters)
  seeded.products = products(seeded)
  seeded.orders = orders(seeded)
  seeded.orderItems = orderItems(seeded)
  seeded.productItems = productItems(seeded)
  seeded.cartItems = cartItems(seeded)
  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'god@example.com',
    name: 'So many names',
    password: '1234',
    isAdmin: true
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234',
    isAdmin: false
  }
})

const categories = seed(Category, {
  artistDesigned: {
    title: 'artist-designed'
  },
  athletic: {
    title: 'athletic'
  },
  basic: {
    title: 'basic'
  }
})

const orders = seed(Order, ({users, products}) => ({
  order1: {
    product_id: products.galaxy.id,
    user_id: users.barack.id
  },
  order2: {
    product_id: products.snazzyworkout.id,
    user_id: users.god.id
  }
}))

const orderItems = seed(OrderItem, ({orders, products}) => ({
  itemOne: {
    quantity: 1,
    product_id: products.galaxy.id,
    order_id: orders.order1.id
  },
  itemTwo: {
    quantity: 1,
    product_id: products.snazzyworkout.id,
    order_id: orders.order2.id
  }
}))

// if there are dependencies, the second param is a function that takes in the seeded object, so that you can use any of the previously made instances
const products = seed(Product, ({categories}) => ({
  galaxy: {
    title: 'galaxy',
    description: 'These are great galaxy leggings',
    price: 100.02,
    photoUrl: 'http://tinyurl.com/y9qjuxjo',
    category_id: categories.basic.id
  },
  snazzyworkout: {
    title: 'snazzyworkout',
    description: 'These are great snazzy workout leggings',
    price: 35.45,
    photoUrl: 'http://tinyurl.com/yd3j7jek',
    category_id: categories.athletic.id
  },
  plainblack: {
    title: 'plainblack',
    description: 'These are great basic, black leggings',
    price: 19.99,
    photoUrl: 'http://tinyurl.com/ybzapozl',
    category_id: categories.basic.id
  }
}))

const productItems = seed(ProductItem, ({products}) => ({
  item1: {
    size: 'S',
    quantity: 5,
    product_id: products.galaxy.id
  },
  item2: {
    size: 'M',
    quantity: 10,
    product_id: products.galaxy.id
  },
  item3: {
    size: 'L',
    quantity: 8,
    product_id: products.galaxy.id
  },
  item4: {
    size: 'S',
    quantity: 9,
    product_id: products.snazzyworkout.id
  },
  item5: {
    size: 'M',
    quantity: 12,
    product_id: products.snazzyworkout.id
  },
  item6: {
    size: 'L',
    quantity: 10,
    product_id: products.snazzyworkout.id
  },
  item7: {
    size: 'M',
    quantity: 10,
    product_id: products.plainblack.id
  },
}))

const cartItems = seed(CartItem, ({users, productItems}) => ({
  item1: {
    quantity: 2,
    product_item_id: productItems.item1.id,
    user_id: users.god.id // we can only say `user` if cartItems has an association to user
  },
  item2: {
    quantity: 3,
    product_item_id: productItems.item7.id,
    user_id: users.god.id
  }
}))

// const favorites = seed(Favorite,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({users, things}) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama loves surfing': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//                                    // that we created in the user seed above.
//                                    // The seed function wires the promises so that it'll
//                                    // have been created already.
//       thing_id: things.surfing.id  // Same thing for things.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: things.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: things.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: things.puppies.id
//     },
//   })
// )

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, products, productItems, cartItems, orders, orderItems, categories})
