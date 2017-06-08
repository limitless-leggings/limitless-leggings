import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
// import SingleProduct from './SingleProduct' import { addStory } from // (this is for importing other components into this one)
// '../../redux/stories'
/* -----------------    COMPONENT     ------------------ */

const ProductList = ({productsList}) => (
  <div>
    <h1>ProductList Page!</h1>
    <ul>
    {
      productsList.map(product => {
        return (<li key={product.id}><Link to={`/products/${product.id}`}>{product.title}
      {/* eventually add image because cool -- KHLM */}</Link></li>)
      })
    }
    </ul>
  </div>
)

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }) => ({ productsList: products.productsList })
// const mapStateToProps = ({ products }) => ({ products })

// const mapDispatch = { // (for later, if we need to mapDispatch)
//   addStory
// }

export default connect(mapStateToProps)(ProductList)
