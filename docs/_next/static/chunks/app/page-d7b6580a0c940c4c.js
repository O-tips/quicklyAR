(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{6819:(e,l,s)=>{Promise.resolve().then(s.bind(s,1968))},1968:(e,l,s)=>{"use strict";s.r(l),s.d(l,{default:()=>o});var n=s(5155),c=s(2115);s(8019);let a=()=>(0,n.jsxs)("header",{className:"header",children:[(0,n.jsx)("h1",{className:"header-title",children:"サクッとAR"}),(0,n.jsx)("p",{className:"header-subtitle",children:"3DモデルとARマーカー用のファイルをアップロードして、オリジナルARサイトを生成しよう！"})]});s(4108);let t=e=>{let{label:l,acceptedFileTypes:s,onFileSelect:a}=e,[t,i]=(0,c.useState)(l),o=(0,c.useRef)(null);return(0,n.jsxs)("div",{className:"file-upload-container",children:[(0,n.jsx)("button",{className:"upload-button",onClick:()=>{var e;null===(e=o.current)||void 0===e||e.click()},children:t}),(0,n.jsx)("input",{type:"file",ref:o,onChange:e=>{var l;let s=null===(l=e.target.files)||void 0===l?void 0:l[0];s&&(i(s.name),a(s))},style:{display:"none"},accept:s}),(0,n.jsx)("div",{className:"file-name",children:t!==l?"選択されたファイル: ".concat(t):""})]})},i=e=>{let{label:l,onClick:s,className:c=""}=e;return(0,n.jsx)("button",{className:"custom-button ".concat(c),onClick:s,children:l})};function o(){return(0,n.jsxs)("div",{className:"container",children:[(0,n.jsx)(a,{}),(0,n.jsxs)("h3",{children:[".mindへの変換ツールは",(0,n.jsx)("a",{href:"https://hiukim.github.io/mind-ar-js-doc/tools/compile",className:"link",children:"こちら"})]}),(0,n.jsxs)("div",{className:"button-container",children:[(0,n.jsx)(t,{label:"3Dモデルを選択",acceptedFileTypes:".glb,.gltf,.obj,.fbx",onFileSelect:e=>{console.log("Selected 3D model:",e.name)}}),(0,n.jsx)(t,{label:"ARマーカーを選択",acceptedFileTypes:".jpg,.jpeg,.png",onFileSelect:e=>{console.log("Selected AR marker:",e.name)}})]}),(0,n.jsxs)("div",{className:"button-container",children:[(0,n.jsx)(i,{label:"AR サイトを生成",onClick:()=>{console.log("Generate AR site clicked")}}),(0,n.jsx)(i,{label:"リセット",onClick:()=>{console.log("Reset clicked")},className:"reset-button"})]})]})}s(4051)},4051:()=>{},4108:()=>{},8019:()=>{}},e=>{var l=l=>e(e.s=l);e.O(0,[757,441,517,358],()=>l(6819)),_N_E=e.O()}]);