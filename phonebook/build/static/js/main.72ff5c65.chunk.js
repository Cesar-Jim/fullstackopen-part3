(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(2),l=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:n,onChange:t}))},f=function(e){var n=e.onSubmit,t=e.newName,a=e.handleNameChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("h2",null,"Add a new person"),r.a.createElement("form",{onSubmit:n},r.a.createElement(i,{value:t,onChange:a}),r.a.createElement(m,{value:u,onChange:c}),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},d=function(e){var n=e.rows;return r.a.createElement("ul",null,n)},s=t(3),h=t.n(s),b="/api/persons",v=function(){return h.a.get(b).then((function(e){return e.data}))},E=function(e){return h.a.post(b,e).then((function(e){return e.data}))},p=function(e){var n="".concat(b,"/").concat(e.id);return h.a.delete(n,e).then((function(e){return e.data}))},g=function(e,n){var t="".concat(b,"/").concat(e.id);return h.a.put(t,n).then((function(e){return e.data}))},w=function(e){var n=e.message,t=e.messageType;return null===n?null:"success"===t?r.a.createElement("div",{className:"success"},n):"error"===t?r.a.createElement("div",{className:"error"},n):null},C=function(){var e=Object(a.useState)(""),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(o.a)(c,2),m=i[0],s=i[1],h=Object(a.useState)(""),b=Object(o.a)(h,2),C=b[0],O=b[1],j=Object(a.useState)([]),N=Object(o.a)(j,2),S=N[0],k=N[1],y=Object(a.useState)(null),T=Object(o.a)(y,2),x=T[0],A=T[1],B=Object(a.useState)(null),J=Object(o.a)(B,2),U=J[0],D=J[1];Object(a.useEffect)((function(){v().then((function(e){return k(e)})).catch((function(e){D("error"),A("Error (couldn't load data): ".concat(e)),setTimeout((function(){D(null),A(null)}),5e3)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h1",null,"PhoneBook"),r.a.createElement(w,{message:x,messageType:U}),r.a.createElement(l,{value:C,onChange:function(e){O(e.target.value)}}),r.a.createElement("br",null),r.a.createElement(f,{onSubmit:function(e){e.preventDefault();var n={name:t,number:m};if(S.find((function(e){return e.name===t}))){if(window.confirm('"'.concat(n.name,'" is already added to phonebook, replace the old number with a new one?'))){var a=S.find((function(e){return e.name===n.name}));g(a,n).then((function(){k(S.splice(S.indexOf(a),1,n)),k(S)})).catch((function(e){D("error"),A("Error (couldn't add number): ".concat(e)),setTimeout((function(){D(null),A(null)}),5e3)})),u(""),s("")}}else E(n).then((function(e){k(S.concat(e)),D("success"),A("Added ".concat(n.name,"!")),setTimeout((function(){A(null),D(null)}),5e3)})).catch((function(e){D("error"),A("Error (couldn't add record of person): ".concat(e)),setTimeout((function(){D(null),A(null)}),5e3)})),u(""),s("")},newName:t,handleNameChange:function(e){u(e.target.value)},newNumber:m,handleNumberChange:function(e){s(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{rows:S.filter((function(e){return-1!==e.name.toUpperCase().indexOf(C.toUpperCase())})).map((function(e){return r.a.createElement("li",{key:e.name},e.name," / ",e.number," ",r.a.createElement("button",{onClick:function(){return function(e){if(window.confirm('Are you sure you want to delete "'.concat(e.name,'"?'))){var n=S.find((function(n){return n.id===e.id}));p(n).then((function(){k(S.filter((function(n){return n!==e})))})).catch((function(e){D("error"),A("Error (couldn't delete record of person): ".concat(e)),setTimeout((function(){D(null),A(null)}),5e3)}))}}(e)}},"delete"))}))}))};t(36);c.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.72ff5c65.chunk.js.map