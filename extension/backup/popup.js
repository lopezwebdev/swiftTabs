import{c as s,j as e,a as n,R as o}from"./createLucideIcon.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=s("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]),i=()=>{const t=()=>{chrome.windows.create({url:"floating.html",type:"popup",width:400,height:600,top:100,left:100,focused:!0}),window.close()};return e.jsxs("div",{className:"w-[300px] p-4",children:[e.jsx("div",{className:"flex items-center justify-between mb-4",children:e.jsx("h1",{className:"text-lg font-semibold",children:"SwiftTabs"})}),e.jsxs("button",{onClick:t,className:"w-full flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",children:[e.jsx(a,{className:"w-4 h-4"}),e.jsx("span",{children:"Open Floating Window"})]})]})};n.createRoot(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx(i,{})}));
