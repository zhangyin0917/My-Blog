"use strict";(self.webpackChunkmy_blog=self.webpackChunkmy_blog||[]).push([[495],{39110:function(e,n,r){var a=r(1413),t=(r(72791),r(55430)),s=r(8822),i=r(80184),l={language:"javascript",showLineNumbers:!0,style:s.Z};n.Z=function(e){var n=e.children;return(0,i.jsx)(t.Z,(0,a.Z)((0,a.Z)({},l),{},{children:n}))}},89495:function(e,n,r){r.r(n),r.d(n,{default:function(){return f}});var a=r(74165),t=r(15861),s=r(29439),i=r(72791),l=r(57689),o=r(64728),c=r(13534),d=r.n(c),p=r(58340),u=r(39110),x=r(80184),f=function(){var e=(0,l.UO)().id,n=new(d()),r=(0,i.useState)(),c=(0,s.Z)(r,2),f=c[0],g=c[1],h=(0,i.useState)(),y=(0,s.Z)(h,2),j=y[0],m=y[1],v=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(r){var t,s,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.Z.get("/api/getBlogById?id=".concat(r));case 3:0===(t=e.sent).data.status&&(console.log(t.data),s=n.render(t.data.data.blog_content),i=s.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(function(e,n){return p.renderToString((0,x.jsx)(u.Z,{children:n}))})),g(i),m(t.data.data)),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){e&&v(e)}),[e]);var b;return(0,x.jsx)("div",{className:"art_deta",children:j&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("h1",{children:j.blog_title}),(0,x.jsxs)("div",{style:{backgroundColor:"#ede4e4",height:"50px",padding:"6px",display:"flex",justifyContent:"center",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("span",{children:j.userInfo.username}),(0,x.jsx)("span",{style:{marginLeft:"15px",color:"#999aaa"},children:"2023-09-09 08:34:52"}),(0,x.jsx)("span",{style:{marginLeft:"15px",color:"#999aaa"},children:"\u53d1\u5e03"})]}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",flexGrow:1,listStyle:"none",marginLeft:"15px"},children:[(0,x.jsx)("span",{style:{color:"#999aaa"},children:"\u5206\u7c7b\u4e13\u680f\uff1a"}),(0,x.jsx)("a",{style:{border:"1px solid #eaeaef",backgroundColor:"#fff",color:"#5094d5",borderRadius:"2px",fontSize:"12px",padding:"3px 6px",height:"25px"},children:j.typeInfo.typeName}),(0,x.jsx)("span",{style:{marginLeft:"5px",color:"#999aaa"},children:"\u6587\u7ae0\u6807\u9898\uff1a"}),(b=j.BlogTags,b.map((function(e,n){return(0,x.jsx)("a",{style:{border:"1px solid #eaeaef",backgroundColor:"#fff",color:"#5094d5",borderRadius:"2px",fontSize:"12px",padding:"3px 6px",height:"25px",marginLeft:"5px"},children:e},n)})))]})]}),(0,x.jsx)("div",{dangerouslySetInnerHTML:{__html:f}})]})})}}}]);
//# sourceMappingURL=495.4bbdab9e.chunk.js.map