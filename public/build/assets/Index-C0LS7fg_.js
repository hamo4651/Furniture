import{V as i,j as e}from"./app-D_W3hKl1.js";import d from"./Master-C1QC2gFZ.js";import{d as c}from"./index-DZ6zD-KU.js";import"./Footer-TlX0IQiB.js";import"./Nav-wOqnItCM.js";import"./Script-By3RXvDw.js";import"./Side-B7SL-hek.js";function y(){const{feedBacks:a}=i().props,l=s=>{confirm("Are you sure you want to delete this feedback?")&&c.Inertia.delete(route("admin.feedback.destroy",{feedback:s}),{onSuccess:()=>{console.log("Feedback deleted successfully!"),setFeedBacks(t=>t.filter(r=>r.id!==s))}})};return e.jsx(e.Fragment,{children:e.jsx(d,{children:e.jsxs("div",{className:"bg-white p-4",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"FeedBack"}),e.jsxs("table",{className:"table table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:" px-4 py-2",children:"ID"}),e.jsx("th",{className:" px-4 py-2",children:"Name"}),e.jsx("th",{className:" px-4 py-2",children:"Email"}),e.jsx("th",{className:" px-4 py-2",children:"Message"}),e.jsx("th",{className:" px-4 py-2",children:"Rating"}),e.jsx("th",{className:" px-4 py-2",children:"Actions"})]})}),e.jsx("tbody",{children:a.data.map(s=>e.jsxs("tr",{children:[e.jsx("td",{className:" px-4 py-2",children:s.id}),e.jsx("td",{className:" px-4 py-2",children:s.name}),e.jsx("td",{className:" px-4 py-2",children:s.email}),e.jsx("td",{className:" px-4 py-2",children:s.message}),e.jsx("td",{className:" px-4 py-2",children:s.rating}),e.jsx("td",{className:" px-4 py-2",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("a",{href:route("admin.feedback.show",{feedback:s.id}),className:"btn btn-primary mx-1",children:"Show"}),e.jsx("button",{onClick:()=>l(s.id),className:"btn btn-danger",children:"Delete"})]})})]},s.id))})]}),e.jsx("div",{className:"mt-4 flex justify-between items-center",children:a.links.map((s,t)=>e.jsx("button",{className:`px-4 py-2 mx-1 border rounded ${s.active?"bg-blue-500 text-white":"bg-white text-gray-700"}`,onClick:()=>s.url&&window.location.assign(s.url),dangerouslySetInnerHTML:{__html:s.label}},t))})]})})})}export{y as default};
