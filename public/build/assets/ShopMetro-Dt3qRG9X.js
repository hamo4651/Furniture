import{V as o,r as d,j as e,U as r}from"./app-D_W3hKl1.js";import m from"./FrontMaster-BcUNaE0F.js";import{d as h}from"./index-DZ6zD-KU.js";import"./Footer-osmuTJyN.js";import"./Nav-DKNr4rQr.js";const u=()=>{const{products:a={data:[],from:0,to:0,total:0,links:[]},filters:x}=o().props,[n,c]=d.useState(!1),l=s=>{s&&(c(!0),h.Inertia.get(s,{},{preserveState:!0}))},t=a.links.filter(s=>s.label!=="&laquo; Previous"&&s.label!=="Next &raquo;");return e.jsx(e.Fragment,{children:e.jsx(m,{children:e.jsxs("div",{className:"container my-5",children:[e.jsx("div",{className:"row g-4",children:n?e.jsx("div",{children:"Loading..."}):a.data.map(s=>{var i;return e.jsx("div",{className:"col-lg-6",children:e.jsxs("div",{className:"large-product",children:[e.jsx(r,{href:route("shop.show",s.id),children:e.jsx("img",{style:{width:"100%",height:"200px"},src:`http://127.0.0.1:8000/images/product_image/${(i=s.images[0])==null?void 0:i.image}`,alt:s.name})}),e.jsx(r,{href:route("shop.show",s.id),children:e.jsxs("div",{className:"hover-overlay",children:[e.jsx("span",{className:"icon",children:e.jsx("i",{className:"fas fa-heart"})}),e.jsx("span",{className:"icon",children:e.jsx("i",{className:"fas fa-shopping-cart"})})]})}),e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsx("h2",{children:s.name}),e.jsxs("p",{className:"price",children:["$",s.price]})]}),e.jsx("p",{className:"d-flex justify-content-between",children:s.category})]})},s.id)})}),e.jsx("div",{className:"d-flex justify-content-center my-4",children:e.jsx("nav",{"aria-label":"Page navigation",children:e.jsxs("ul",{className:"pagination",children:[e.jsx("li",{className:`page-item ${a.from===1?"disabled":""}`,children:e.jsx("button",{className:"page-link",onClick:()=>{var s;return l((s=a.links[0])==null?void 0:s.url)},disabled:a.from===1,children:"Previous"})}),Array.isArray(t)&&t.map((s,i)=>e.jsx("li",{className:`page-item ${s.active?"active":""}`,children:e.jsx("button",{className:"page-link",onClick:()=>l(s.url),children:s.label})},i)),e.jsx("li",{className:`page-item ${a.to===a.total?"disabled":""}`,children:e.jsx("button",{className:"page-link",onClick:()=>{var s;return l((s=a.links[a.links.length-1])==null?void 0:s.url)},disabled:a.to===a.total,children:"Next"})})]})})})]})})})};export{u as default};
