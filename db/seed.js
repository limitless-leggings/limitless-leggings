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
    title: 'Artist-Designed Galaxy Leggings',
    description: 'Look like a supernova in these leggings!',
    price: 49.99,
    photoUrl: 'http://tinyurl.com/y9qjuxjo',
    category_id: categories.artistDesigned.id
  },
  snazzyworkout: {
    title: 'Sparkly Workout Leggings',
    description: 'These are some super sparkly snazzy workout leggings. Wear them proudly on the elliptical.',
    price: 29.99,
    photoUrl: 'http://tinyurl.com/yd3j7jek',
    category_id: categories.athletic.id
  },
  plainblack: {
    title: 'Cotton Basic Black Leggings',
    description: 'These are great basic, black leggings.',
    price: 19.99,
    photoUrl: 'http://tinyurl.com/ybzapozl',
    category_id: categories.basic.id
  },
  mermaid: {
    title: 'Mermaid Leggings',
    description: 'Look like a mermaid in these leggings!',
    price: 49.99,
    photoUrl: 'http://tinyurl.com/y7ohlpq7',
    category_id: categories.artistDesigned.id
  },
  starrynight: {
    title: 'Starry Night Leggings',
    description: 'Vincent Van Gogh would have loved these. They would have looked excellent on his thin frame.',
    price: 49.99,
    photoUrl: 'http://tinyurl.com/yby7y38x',
    category_id: categories.artistDesigned.id
  },
  workouttext: {
    title: '"WORK OUT" Leggings',
    description: 'Make sure everyone knows you work out: Shout it loud and clear from your pants!',
    price: 29.99,
    photoUrl: 'http://tinyurl.com/ydezz8g8',
    category_id: categories.athletic.id
  },
  pacmanathletic: {
    title: 'Pac-man Athletic Capri Leggings',
    description: 'Pac-man will eat your sweat! Get moving in these capri leggings.',
    price: 29.99,
    photoUrl: 'http://tinyurl.com/yakm5y9s',
    category_id: categories.athletic.id
  },
  swirly: {
    title: 'Swirly Leggings',
    description: 'Get your psychedelic groove on in these leggings',
    price: 49.99,
    photoUrl: 'http://tinyurl.com/y82yx6a4',
    category_id: categories.artistDesigned.id
  },
  veganleather: {
    title: 'Blue Vegan Leather Leggings',
    description: 'Get your psychedelic groove on in these leggings!',
    price: 49.99,
    photoUrl: 'http://tinyurl.com/ycxdtpd3',
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
  item8: {
    size: 'M',
    quantity: 12,
    product_id: products.mermaid.id,
  item9: {
    size: 'S',
    quantity: 2,
    product_id: products.starrynight.id
  },
  item10: {
    size: 'M',
    quantity: 2,
    product_id: products.workouttext.id
  },
  item11: {
    size: 'L',
    quantity: 4,
    product_id: products.workouttext.id
  },
  item12: {
    size: 'M',
    quantity: 12,
    product_id: products.mermaid.id,
  },
  item13: {
    size: 'M',
    quantity: 3,
    product_id: products.starrynight.id
  },
  item14: {
    size: 'M',
    quantity: 6,
    product_id: products.pacmanathletic.id
  },
  item15: {
    size: 'L',
    quantity: 9,
    product_id: products.pacmanathletic.id
  },
  item16: {
    size: 'S',
    quantity: 9,
    product_id: products.swirly.id
  },
  item17: {
    size: 'L',
    quantity: 6,
    product_id: products.swirly.id
  },
  item18: {
    size: 'M',
    quantity: 4,
    product_id: products.veganleather.id
  },
  item19: {
    size: 'L',
    quantity: 6,
    product_id: products.veganleather.id
  }
}}))

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
