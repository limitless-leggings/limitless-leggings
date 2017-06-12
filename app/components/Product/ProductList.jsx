import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import Sidebar from '../Sidebar'
// import SingleProduct from './SingleProduct' import { addStory } from // (this is for importing other components into this one)
// '../../redux/stories'
/* -----------------    COMPONENT     ------------------ */

const ProductList = ({productsList}) => (
  <div id="main">
    <div className="col-xs-2">
      <Sidebar />
    </div>
      <div className="col-xs-10">
          {
            productsList.map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.photoUrl} />
                    <div className="caption">
                      <h5>
                        <span>{product.title}</span>
                      </h5>
                    </div>
                  </Link>
                </div>)
            })
          }
          </div>
  </div>

)

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }) => ({ productsList: products.productsList })

// const mapDispatch = { // (for later, if we need to mapDispatch)
//   addStory
// }

export default connect(mapStateToProps)(ProductList)
