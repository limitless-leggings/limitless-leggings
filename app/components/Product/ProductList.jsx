import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Sidebar from '../Sidebar'

/* -----------------    COMPONENT     ------------------ */

const ProductList = ({ productsList }) => (
  <div id="main">
    <div className="col-xs-2">
      <Sidebar />
    </div>
    <div className="col-xs-10">
      <div className="row">
        {
          productsList.map(product => {
            return (
              <div className="col-xs-4" key={product.id}>
                <Link className="thumbnail" to={`/products/${product.id}`}>
                  <img className="product-img" src={product.photoUrl} />
                  <div className="caption text-center">
                    <h5>
                      <span>{product.title}</span>
                    </h5>
                  </div>
                </Link>
              </div>
              )
          })
        }
      </div>
    </div>
  </div>

)

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }) => ({ productsList: products.productsList })

export default connect(mapStateToProps)(ProductList)
