import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
// import SingleProduct from './SingleProduct' import { addStory } from // (this is for importing other components into this one)
// '../../redux/stories'
// this should be a .jsx because consistency -- KHLM
/* -----------------    COMPONENT     ------------------ */

class ProductList extends React.Component { // make me dumb and destructure in my function declaration function ({products}) {}
  render() {
    const {products} = this.props

    return (
      <div>
        <h1>ProductList Page!</h1>
        <ul>
        {
          products.list.map(product => {
            return (<li key={product.id}><Link to={`/products/${product.id}`}>{product.title}
          {/* eventually add image because cool -- KHLM */}</Link></li>)
            })
        }
        </ul>
      </div>

    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }) => ({ products }) // make this seem consistent to singleProduct (where you only pass in list) -- KHLM

// const mapDispatch = { // (for later, if we need to mapDispatch)
//   addStory
// }

export default connect(mapStateToProps, null)(ProductList)
