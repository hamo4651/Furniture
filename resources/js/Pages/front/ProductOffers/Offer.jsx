import "./Shop.css";
import FrontMaster from "../FrontMaster";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
const Offer = () => {
   const {
          products = { data: [], from: 0, to: 0, total: 0, links: [] },
          filters,
      } = usePage().props;
      // //////////////
      const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
        console.log(products);
  
      const handlePriceChange = (e) => {
          const { name, value } = e.target;
          setPriceRange((prevRange) => ({
              ...prevRange,
              [name]: value,
          }));
      };
  
      const handlePriceFilter = () => {
          Inertia.get(route("getProductsoffers"), {
              sort_by: filters?.sort_by || "",
              min_price: priceRange.min,
              max_price: priceRange.max,
          });
      };
      /////////////
      const { data, setData, post, processing, errors } = useForm({
          product_id: null,
          quantity: 1,
          price: 0,
      });
      // const [isSubmitting, setIsSubmitting] = useState(false);
  
      const handleAddToCart = (productId, discountedPrice, originalPrice) => {
          const priceToUse =
              discountedPrice < originalPrice ? discountedPrice : originalPrice;
  
          // setIsSubmitting(true);
          const updatedData = {
              ...data,
              product_id: productId,
              price: priceToUse,
          };
  
          // إرسال الطلب بعد تحديث البيانات
          setData(updatedData);
          console.log(updatedData);
  
          // إرسال النموذج
          post(route("cart.store"), {
              data: {
                  product_id: productId,
                  quantity: 1,
                  price: priceToUse,
              },
              onSuccess: () => {
                  alert("Product added to cart successfully!");
                  // setIsSubmitting(false); // السماح بإرسال الطلبات بعد النجاح
              },
              onError: (errors) => {
                  // setIsSubmitting(false); // السماح بإرسال الطلبات بعد النجاح
  
                  console.error("Errors:", errors);
                  alert("An error occurred. Please try again.");
              },
          });
      };
      ////////////
      const handleSortChange = (e) => {
          const sortBy = e.target.value;
          Inertia.get(route("getProductsoffers"), { sort_by: sortBy });
      };
  
      const handlePagination = (url) => {
          if (url) {
              Inertia.get(url);
          }
      };
  
      // console.log("Products:", products);
  
      // const handleAddToCart = (productId, discountedPrice, originalPrice) => {
      //     // تحديد السعر الذي سيتم إضافته (السعر المخفض إذا كان موجودًا، أو السعر الأصلي)
      //     const priceToUse = discountedPrice < originalPrice ? discountedPrice : originalPrice;
  
      //     Inertia.post(
      //         route("cart.store"),
      //         {
      //             product_id: productId, // استخدام المعامل productId
      //             quantity: 1, // الكمية الافتراضية (يمكن تغييرها)
      //             price: priceToUse, // إضافة السعر الجديد هنا
      //         },
      //         {
      //             onSuccess: () => {
      //                 alert("Product added to cart successfully!"); // عرض رسالة نجاح
      //             },
      //             onError: (errors) => {
      //                 alert("An error occurred. Please try again."); // عرض رسالة خطأ
      //             },
      //         }
      //     );
      // };
  
      const [loading, setLoading] = React.useState(false);
  
      const handleAddToFavorite = (productId) => {
          setLoading(true);
          Inertia.post(
              route("favorite.store"),
              {
                  product_id: productId,
              },
              {
                  onSuccess: () => {
                      setLoading(false);
                      alert("Product added to favorite successfully!");
                  },
                  onError: () => {
                      setLoading(false);
                      alert("An error occurred. Please try again.");
                  },
              }
          );
      };
      return (
          <>
              <FrontMaster>
                  <div className="bg-light">
                      <div className="row">
                          <div className="col-12">
                              <img
                                  style={{ height: "350px", overflow: "hidden" }}
                                  src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                                  alt="Login Image"
                                  className="img-fluid w-100"
                              />
                          </div>
                      </div>
                  </div>
  
                  <div className="container my-5">
                      <div className="row">
                          <div className="col-lg-9">
                              <div className="row mb-3">
                                  <div className="col d-flex justify-content-between">
                                      <p>
                                          Showing {products.from}–{products.to} of{" "}
                                          {products.total} results
                                      </p>
                                      <select
                                          className="form-select w-auto"
                                          onChange={handleSortChange}
                                      >
                                          <option value="">
                                              Sort by popularity
                                          </option>
                                          <option value="price_low_to_high">
                                              Sort by price: low to high
                                          </option>
                                          <option value="price_high_to_low">
                                              Sort by price: high to low
                                          </option>
                                      </select>
                                  </div>
                              </div>
  
                              <div className="row g-4">
                                  {Array.isArray(products.data) &&
                                  products.data.length > 0 ? (
                                      products.data.map((product) => (
                                          <div
                                              className="col-md-4"
                                              key={product.id}
                                          >
                                              <div className="product-card">
                                                  <Link
                                                      href={route(
                                                          "shop.show",
                                                          product.id
                                                      )}
                                                  >
                                                      <img
                                                          style={{
                                                              width: "100%",
                                                              height: "200px",
                                                          }}
                                                          src={`http://127.0.0.1:8000/images/product_image/${product.images[0]?.image}`}
                                                          alt={product.name}
                                                      />
                                                  </Link>
  
                                                  {/* <Link
                                                      href={route(
                                                          "shop.show",
                                                          product.id
                                                      )}
                                                  > */}
                                                  <div className="hover-overlay">
                                                      <span
                                                          className="icon"
                                                          onClick={
                                                              !loading
                                                                  ? () =>
                                                                        handleAddToFavorite(
                                                                            product.id
                                                                        )
                                                                  : undefined
                                                          }
                                                          style={{
                                                              cursor: loading
                                                                  ? "not-allowed"
                                                                  : "pointer",
                                                          }}
                                                      >
                                                          <i className="fas fa-heart"></i>
                                                      </span>
                                                      <span
                                                          className="icon"
                                                          onClick={() =>
                                                              handleAddToCart(
                                                                  product.id,
                                                                  product.discounted_price,
                                                                  product.price
                                                              )
                                                          }
                                                      >
                                                          <i className="fas fa-shopping-cart"></i>
                                                      </span>
                                                      <span>
                                                          <Link
                                                              href={route(
                                                                  // console.log(product.id),
                                                                  
                                                                  "shop.show",
                                                                  product.id
                                                              )}
                                                              className="icon"
                                                          >
                                                              <i className="fas fa-eye"></i>
                                                          </Link>
                                                      </span>
                                                  </div>
                                                  {/* </Link> */}
  
                                                  <h5 className="mt-2">
                                                      <Link
                                                          href={route(
                                                              "shop.show",
                                                              product.id
                                                          )}
                                                      >
                                                          {product.name}
                                                      </Link>
                                                  </h5>
                                                  {/* <p className="price">
                                                      ${product.price}
                                                  </p> */}
                                                  <p className="price text-xl font-semibold text-gray-800">
                                                      {product.discounted_price <
                                                      product.price ? (
                                                          <>
                                                              <span className="line-through text-red-500 text-sm mr-2">
                                                                  ${product.price}
                                                              </span>
                                                              <span className="text-green-600">
                                                                  $
                                                                  {product.discounted_price.toFixed(
                                                                      2
                                                                  )}
                                                              </span>
                                                          </>
                                                      ) : (
                                                          <span>
                                                              ${product.price}
                                                          </span>
                                                      )}
                                                  </p>
  
                                                  {/* Category Section */}
                                                  {/* <p className="text-sm text-gray-600 mt-2">Category: <span className="font-medium">{product.category.name}</span></p> */}
  
                                                  {/* Offers Section */}
                                                  {product.offers &&
                                                      product.offers.length >
                                                          0 && (
                                                          <div className="offers mt-4">
                                                              <h6 className="text-md font-medium text-gray-700 mb-2">
                                                                  Available
                                                                  Offers:
                                                              </h6>
                                                              <ul className="list-disc list-inside">
                                                                  {product.offers.map(
                                                                      (offer) => (
                                                                          <li
                                                                              key={
                                                                                  offer.id
                                                                              }
                                                                              className="text-gray-600 text-sm"
                                                                          >
                                                                              Save{" "}
                                                                              <span className="text-green-600 font-bold">
                                                                                  {
                                                                                      offer.discount_percentage
                                                                                  }
                                                                                  %
                                                                              </span>
                                                                          </li>
                                                                      )
                                                                  )}
                                                              </ul>
                                                          </div>
                                                      )}
                                              </div>
                                          </div>
                                      ))
                                  ) : (
                                      <p>No products available</p>
                                  )}
                              </div>
  
                              <nav className="mt-4">
                                  <ul className="pagination justify-content-center">
                                      {Array.isArray(products.links) &&
                                          products.links.map((link, index) => (
                                              <li
                                                  key={index}
                                                  className={`page-item ${
                                                      link.active ? "active" : ""
                                                  } ${
                                                      !link.url ? "disabled" : ""
                                                  }`}
                                              >
                                                  <button
                                                      className="page-link"
                                                      onClick={() =>
                                                          handlePagination(
                                                              link.url
                                                          )
                                                      }
                                                      dangerouslySetInnerHTML={{
                                                          __html: link.label,
                                                      }}
                                                  ></button>
                                              </li>
                                          ))}
                                  </ul>
                              </nav>
                          </div>
  
                          <div className="col-lg-3">
                              {/* <div className="sidebar mb-4">
                                  <h5>Filter by price</h5>
                                  <input
                                      type="range"
                                      className="form-range"
                                      min="20"
                                      max="400"
                                  />
                                  <p>Price: $20 — $400</p>
                                  <button className="btn btn-primary btn-sm">
                                      Filter
                                  </button>
                              </div> */}
                              <div className="sidebar mb-4">
                                  <h5>Filter by price</h5>
                                  <input
                                      type="range"
                                      className="form-range"
                                      name="min"
                                      min="20"
                                      max={priceRange.max}
                                      value={priceRange.min}
                                      onChange={handlePriceChange}
                                  />
                                  <input
                                      type="range"
                                      className="form-range"
                                      name="max"
                                      min={priceRange.min}
                                      max="400"
                                      value={priceRange.max}
                                      onChange={handlePriceChange}
                                  />
                                  <p>
                                      Price: ${priceRange.min} — ${priceRange.max}
                                  </p>
                                  <button
                                      className="btn btn-primary btn-sm"
                                      onClick={handlePriceFilter}
                                  >
                                      Filter
                                  </button>
                              </div>
                              <div className="sidebar">
                                  <h5>Categories</h5>
                                  <ul className="list-unstyled">
                                      <li>
                                          <a href="#">Decoration (18)</a>
                                      </li>
                                      <li>
                                          <a href="#">Dinnerware (12)</a>
                                      </li>
                                      <li>
                                          <a href="#">Furniture (20)</a>
                                      </li>
                                      <li>
                                          <a href="#">Lighting (5)</a>
                                      </li>
                                      <li>
                                          <a href="#">Special (11)</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </FrontMaster>
          </>
      );
  };
  
  export default Offer;
  