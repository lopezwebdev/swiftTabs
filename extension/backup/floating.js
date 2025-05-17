import{c as o,r as n,j as s,a as M,R as N}from"./createLucideIcon.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=o("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=o("Minimize2",[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=o("Move",[["polyline",{points:"5 9 2 12 5 15",key:"1r5uj5"}],["polyline",{points:"9 5 12 2 15 5",key:"5v383o"}],["polyline",{points:"15 19 12 22 9 19",key:"g7qi8m"}],["polyline",{points:"19 9 22 12 19 15",key:"tpp73q"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12",key:"1dnqot"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=o("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=o("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),I=()=>{const[u,c]=n.useState([]),[i,d]=n.useState(""),[p,m]=n.useState(!1),[x,y]=n.useState({x:0,y:0}),[l,g]=n.useState(!1);n.useEffect(()=>{chrome.tabs.query({},a=>{c(a.map(t=>({id:t.id,title:t.title,url:t.url,favIconUrl:t.favIconUrl})))});const e=()=>{chrome.tabs.query({},a=>{c(a.map(t=>({id:t.id,title:t.title,url:t.url,favIconUrl:t.favIconUrl})))})};return chrome.tabs.onUpdated.addListener(e),chrome.tabs.onCreated.addListener(e),chrome.tabs.onRemoved.addListener(e),()=>{chrome.tabs.onUpdated.removeListener(e),chrome.tabs.onCreated.removeListener(e),chrome.tabs.onRemoved.removeListener(e)}},[]);const f=u.filter(e=>e.title.toLowerCase().includes(i.toLowerCase())||e.url.toLowerCase().includes(i.toLowerCase())),v=e=>{chrome.tabs.update(e,{active:!0})},j=e=>{e.target instanceof HTMLElement&&e.target.closest(".draggable")&&(m(!0),y({x:e.clientX,y:e.clientY}))},w=e=>{if(p){const a=e.clientX-x.x,t=e.clientY-x.y,r=chrome.windows.getCurrent();r&&chrome.windows.update(r.id,{left:r.left+a,top:r.top+t}),y({x:e.clientX,y:e.clientY})}},h=()=>{m(!1)},k=()=>{g(!l)};return s.jsxs("div",{className:`fixed bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${l?"h-12":"h-[600px]"}`,style:{width:"400px"},onMouseDown:j,onMouseMove:w,onMouseUp:h,onMouseLeave:h,children:[s.jsxs("div",{className:"draggable flex items-center justify-between p-2 bg-gray-100 cursor-move",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(C,{className:"w-4 h-4 text-gray-500"}),s.jsx("span",{className:"text-sm font-medium",children:"SwiftTabs"})]}),s.jsx("div",{className:"flex items-center gap-2",children:s.jsx("button",{onClick:k,className:"p-1 hover:bg-gray-200 rounded",children:l?s.jsx(b,{className:"w-4 h-4"}):s.jsx(L,{className:"w-4 h-4"})})})]}),!l&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"p-4",children:s.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[s.jsx(S,{className:"w-4 h-4 text-gray-500"}),s.jsx("input",{type:"text",placeholder:"Search tabs...",className:"flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",value:i,onChange:e=>d(e.target.value)}),i&&s.jsx("button",{onClick:()=>d(""),className:"p-2 text-gray-500 hover:text-gray-700",children:s.jsx(U,{className:"w-4 h-4"})})]})}),s.jsx("div",{className:"px-4 space-y-2 overflow-y-auto max-h-[450px]",children:f.map(e=>s.jsxs("div",{onClick:()=>v(e.id),className:"flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer",children:[e.favIconUrl&&s.jsx("img",{src:e.favIconUrl,alt:"",className:"w-4 h-4"}),s.jsxs("div",{className:"flex-1 min-w-0",children:[s.jsx("p",{className:"text-sm font-medium truncate",children:e.title}),s.jsx("p",{className:"text-xs text-gray-500 truncate",children:e.url})]})]},e.id))})]})]})};M.createRoot(document.getElementById("root")).render(s.jsx(N.StrictMode,{children:s.jsx(I,{})}));
