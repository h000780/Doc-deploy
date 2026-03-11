(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var r=e.i(29511),s=e.i(58138);let t=(e=new Map,r=null,s)=>({nextPart:e,validators:r,classGroupId:s}),o=[],a=(e,r,s)=>{if(0==e.length-r)return s.classGroupId;let t=e[r],o=s.nextPart.get(t);if(o){let s=a(e,r+1,o);if(s)return s}let i=s.validators;if(null===i)return;let l=0===r?e.join("-"):e.slice(r).join("-"),d=i.length;for(let e=0;e<d;e++){let r=i[e];if(r.validator(l))return r.classGroupId}},i=(e,r)=>{let s=t();for(let t in e)l(e[t],s,t,r);return s},l=(e,r,s,t)=>{let o=e.length;for(let a=0;a<o;a++)d(e[a],r,s,t)},d=(e,r,s,t)=>{"string"==typeof e?n(e,r,s):"function"==typeof e?c(e,r,s,t):p(e,r,s,t)},n=(e,r,s)=>{(""===e?r:m(r,e)).classGroupId=s},c=(e,r,s,t)=>{x(e)?l(e(t),r,s,t):(null===r.validators&&(r.validators=[]),r.validators.push({classGroupId:s,validator:e}))},p=(e,r,s,t)=>{let o=Object.entries(e),a=o.length;for(let e=0;e<a;e++){let[a,i]=o[e];l(i,m(r,a),s,t)}},m=(e,r)=>{let s=e,o=r.split("-"),a=o.length;for(let e=0;e<a;e++){let r=o[e],a=s.nextPart.get(r);a||(a=t(),s.nextPart.set(r,a)),s=a}return s},x=e=>"isThemeGetter"in e&&!0===e.isThemeGetter,u=[],h=(e,r,s,t,o)=>({modifiers:e,hasImportantModifier:r,baseClassName:s,maybePostfixModifierPosition:t,isExternal:o}),b=/\s+/,f=e=>{let r;if("string"==typeof e)return e;let s="";for(let t=0;t<e.length;t++)e[t]&&(r=f(e[t]))&&(s&&(s+=" "),s+=r);return s},g=[],j=e=>{let r=r=>r[e]||g;return r.isThemeGetter=!0,r},v=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,k=/^\((?:(\w[\w-]*):)?(.+)\)$/i,y=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,w=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,P=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,N=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,I=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,T=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,A=e=>y.test(e),S=e=>!!e&&!Number.isNaN(Number(e)),z=e=>!!e&&Number.isInteger(Number(e)),E=e=>e.endsWith("%")&&S(e.slice(0,-1)),C=e=>w.test(e),D=()=>!0,R=e=>P.test(e)&&!N.test(e),G=()=>!1,O=e=>I.test(e),q=e=>T.test(e),U=e=>!M(e)&&!Q(e),L=e=>es(e,ei,G),M=e=>v.test(e),H=e=>es(e,el,R),K=e=>es(e,ed,S),B=e=>es(e,ec,D),W=e=>es(e,en,G),_=e=>es(e,eo,G),J=e=>es(e,ea,q),Z=e=>es(e,ep,O),Q=e=>k.test(e),$=e=>et(e,el),X=e=>et(e,en),F=e=>et(e,eo),V=e=>et(e,ei),Y=e=>et(e,ea),ee=e=>et(e,ep,!0),er=e=>et(e,ec,!0),es=(e,r,s)=>{let t=v.exec(e);return!!t&&(t[1]?r(t[1]):s(t[2]))},et=(e,r,s=!1)=>{let t=k.exec(e);return!!t&&(t[1]?r(t[1]):s)},eo=e=>"position"===e||"percentage"===e,ea=e=>"image"===e||"url"===e,ei=e=>"length"===e||"size"===e||"bg-size"===e,el=e=>"length"===e,ed=e=>"number"===e,en=e=>"family-name"===e,ec=e=>"number"===e||"weight"===e,ep=e=>"shadow"===e,em=((e,...r)=>{let s,t,l,d,n=e=>{let r=t(e);if(r)return r;let o=((e,r)=>{let{parseClassName:s,getClassGroupId:t,getConflictingClassGroupIds:o,sortModifiers:a}=r,i=[],l=e.trim().split(b),d="";for(let e=l.length-1;e>=0;e-=1){let r=l[e],{isExternal:n,modifiers:c,hasImportantModifier:p,baseClassName:m,maybePostfixModifierPosition:x}=s(r);if(n){d=r+(d.length>0?" "+d:d);continue}let u=!!x,h=t(u?m.substring(0,x):m);if(!h){if(!u||!(h=t(m))){d=r+(d.length>0?" "+d:d);continue}u=!1}let b=0===c.length?"":1===c.length?c[0]:a(c).join(":"),f=p?b+"!":b,g=f+h;if(i.indexOf(g)>-1)continue;i.push(g);let j=o(h,u);for(let e=0;e<j.length;++e){let r=j[e];i.push(f+r)}d=r+(d.length>0?" "+d:d)}return d})(e,s);return l(e,o),o};return d=c=>{var p;let m;return t=(s={cache:(e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let r=0,s=Object.create(null),t=Object.create(null),o=(o,a)=>{s[o]=a,++r>e&&(r=0,t=s,s=Object.create(null))};return{get(e){let r=s[e];return void 0!==r?r:void 0!==(r=t[e])?(o(e,r),r):void 0},set(e,r){e in s?s[e]=r:o(e,r)}}})((p=r.reduce((e,r)=>r(e),e())).cacheSize),parseClassName:(e=>{let{prefix:r,experimentalParseClassName:s}=e,t=e=>{let r,s=[],t=0,o=0,a=0,i=e.length;for(let l=0;l<i;l++){let i=e[l];if(0===t&&0===o){if(":"===i){s.push(e.slice(a,l)),a=l+1;continue}if("/"===i){r=l;continue}}"["===i?t++:"]"===i?t--:"("===i?o++:")"===i&&o--}let l=0===s.length?e:e.slice(a),d=l,n=!1;return l.endsWith("!")?(d=l.slice(0,-1),n=!0):l.startsWith("!")&&(d=l.slice(1),n=!0),h(s,n,d,r&&r>a?r-a:void 0)};if(r){let e=r+":",s=t;t=r=>r.startsWith(e)?s(r.slice(e.length)):h(u,!1,r,void 0,!0)}if(s){let e=t;t=r=>s({className:r,parseClassName:e})}return t})(p),sortModifiers:(m=new Map,p.orderSensitiveModifiers.forEach((e,r)=>{m.set(e,1e6+r)}),e=>{let r=[],s=[];for(let t=0;t<e.length;t++){let o=e[t],a="["===o[0],i=m.has(o);a||i?(s.length>0&&(s.sort(),r.push(...s),s=[]),r.push(o)):s.push(o)}return s.length>0&&(s.sort(),r.push(...s)),r}),...(e=>{let r=(e=>{let{theme:r,classGroups:s}=e;return i(s,r)})(e),{conflictingClassGroups:s,conflictingClassGroupModifiers:t}=e;return{getClassGroupId:e=>{if(e.startsWith("[")&&e.endsWith("]")){var s;let r,t,o;return -1===(s=e).slice(1,-1).indexOf(":")?void 0:(t=(r=s.slice(1,-1)).indexOf(":"),(o=r.slice(0,t))?"arbitrary.."+o:void 0)}let t=e.split("-"),o=+(""===t[0]&&t.length>1);return a(t,o,r)},getConflictingClassGroupIds:(e,r)=>{if(r){let r=t[e],a=s[e];if(r){if(a){let e=Array(a.length+r.length);for(let r=0;r<a.length;r++)e[r]=a[r];for(let s=0;s<r.length;s++)e[a.length+s]=r[s];return e}return r}return a||o}return s[e]||o}}})(p)}).cache.get,l=s.cache.set,d=n,n(c)},(...e)=>d(((...e)=>{let r,s,t=0,o="";for(;t<e.length;)(r=e[t++])&&(s=f(r))&&(o&&(o+=" "),o+=s);return o})(...e))})(()=>{let e=j("color"),r=j("font"),s=j("text"),t=j("font-weight"),o=j("tracking"),a=j("leading"),i=j("breakpoint"),l=j("container"),d=j("spacing"),n=j("radius"),c=j("shadow"),p=j("inset-shadow"),m=j("text-shadow"),x=j("drop-shadow"),u=j("blur"),h=j("perspective"),b=j("aspect"),f=j("ease"),g=j("animate"),v=()=>["auto","avoid","all","avoid-page","page","left","right","column"],k=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],y=()=>[...k(),Q,M],w=()=>["auto","hidden","clip","visible","scroll"],P=()=>["auto","contain","none"],N=()=>[Q,M,d],I=()=>[A,"full","auto",...N()],T=()=>[z,"none","subgrid",Q,M],R=()=>["auto",{span:["full",z,Q,M]},z,Q,M],G=()=>[z,"auto",Q,M],O=()=>["auto","min","max","fr",Q,M],q=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],es=()=>["start","end","center","stretch","center-safe","end-safe"],et=()=>["auto",...N()],eo=()=>[A,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...N()],ea=()=>[A,"screen","full","dvw","lvw","svw","min","max","fit",...N()],ei=()=>[A,"screen","full","lh","dvh","lvh","svh","min","max","fit",...N()],el=()=>[e,Q,M],ed=()=>[...k(),F,_,{position:[Q,M]}],en=()=>["no-repeat",{repeat:["","x","y","space","round"]}],ec=()=>["auto","cover","contain",V,L,{size:[Q,M]}],ep=()=>[E,$,H],em=()=>["","none","full",n,Q,M],ex=()=>["",S,$,H],eu=()=>["solid","dashed","dotted","double"],eh=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],eb=()=>[S,E,F,_],ef=()=>["","none",u,Q,M],eg=()=>["none",S,Q,M],ej=()=>["none",S,Q,M],ev=()=>[S,Q,M],ek=()=>[A,"full",...N()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[C],breakpoint:[C],color:[D],container:[C],"drop-shadow":[C],ease:["in","out","in-out"],font:[U],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[C],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[C],shadow:[C],spacing:["px",S],text:[C],"text-shadow":[C],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",A,M,Q,b]}],container:["container"],columns:[{columns:[S,M,Q,l]}],"break-after":[{"break-after":v()}],"break-before":[{"break-before":v()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:y()}],overflow:[{overflow:w()}],"overflow-x":[{"overflow-x":w()}],"overflow-y":[{"overflow-y":w()}],overscroll:[{overscroll:P()}],"overscroll-x":[{"overscroll-x":P()}],"overscroll-y":[{"overscroll-y":P()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:I()}],"inset-x":[{"inset-x":I()}],"inset-y":[{"inset-y":I()}],start:[{"inset-s":I(),start:I()}],end:[{"inset-e":I(),end:I()}],"inset-bs":[{"inset-bs":I()}],"inset-be":[{"inset-be":I()}],top:[{top:I()}],right:[{right:I()}],bottom:[{bottom:I()}],left:[{left:I()}],visibility:["visible","invisible","collapse"],z:[{z:[z,"auto",Q,M]}],basis:[{basis:[A,"full","auto",l,...N()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[S,A,"auto","initial","none",M]}],grow:[{grow:["",S,Q,M]}],shrink:[{shrink:["",S,Q,M]}],order:[{order:[z,"first","last","none",Q,M]}],"grid-cols":[{"grid-cols":T()}],"col-start-end":[{col:R()}],"col-start":[{"col-start":G()}],"col-end":[{"col-end":G()}],"grid-rows":[{"grid-rows":T()}],"row-start-end":[{row:R()}],"row-start":[{"row-start":G()}],"row-end":[{"row-end":G()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":O()}],"auto-rows":[{"auto-rows":O()}],gap:[{gap:N()}],"gap-x":[{"gap-x":N()}],"gap-y":[{"gap-y":N()}],"justify-content":[{justify:[...q(),"normal"]}],"justify-items":[{"justify-items":[...es(),"normal"]}],"justify-self":[{"justify-self":["auto",...es()]}],"align-content":[{content:["normal",...q()]}],"align-items":[{items:[...es(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...es(),{baseline:["","last"]}]}],"place-content":[{"place-content":q()}],"place-items":[{"place-items":[...es(),"baseline"]}],"place-self":[{"place-self":["auto",...es()]}],p:[{p:N()}],px:[{px:N()}],py:[{py:N()}],ps:[{ps:N()}],pe:[{pe:N()}],pbs:[{pbs:N()}],pbe:[{pbe:N()}],pt:[{pt:N()}],pr:[{pr:N()}],pb:[{pb:N()}],pl:[{pl:N()}],m:[{m:et()}],mx:[{mx:et()}],my:[{my:et()}],ms:[{ms:et()}],me:[{me:et()}],mbs:[{mbs:et()}],mbe:[{mbe:et()}],mt:[{mt:et()}],mr:[{mr:et()}],mb:[{mb:et()}],ml:[{ml:et()}],"space-x":[{"space-x":N()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":N()}],"space-y-reverse":["space-y-reverse"],size:[{size:eo()}],"inline-size":[{inline:["auto",...ea()]}],"min-inline-size":[{"min-inline":["auto",...ea()]}],"max-inline-size":[{"max-inline":["none",...ea()]}],"block-size":[{block:["auto",...ei()]}],"min-block-size":[{"min-block":["auto",...ei()]}],"max-block-size":[{"max-block":["none",...ei()]}],w:[{w:[l,"screen",...eo()]}],"min-w":[{"min-w":[l,"screen","none",...eo()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[i]},...eo()]}],h:[{h:["screen","lh",...eo()]}],"min-h":[{"min-h":["screen","lh","none",...eo()]}],"max-h":[{"max-h":["screen","lh",...eo()]}],"font-size":[{text:["base",s,$,H]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[t,er,B]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",E,M]}],"font-family":[{font:[X,W,r]}],"font-features":[{"font-features":[M]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[o,Q,M]}],"line-clamp":[{"line-clamp":[S,"none",Q,K]}],leading:[{leading:[a,...N()]}],"list-image":[{"list-image":["none",Q,M]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Q,M]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:el()}],"text-color":[{text:el()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...eu(),"wavy"]}],"text-decoration-thickness":[{decoration:[S,"from-font","auto",Q,H]}],"text-decoration-color":[{decoration:el()}],"underline-offset":[{"underline-offset":[S,"auto",Q,M]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:N()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Q,M]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Q,M]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:ed()}],"bg-repeat":[{bg:en()}],"bg-size":[{bg:ec()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},z,Q,M],radial:["",Q,M],conic:[z,Q,M]},Y,J]}],"bg-color":[{bg:el()}],"gradient-from-pos":[{from:ep()}],"gradient-via-pos":[{via:ep()}],"gradient-to-pos":[{to:ep()}],"gradient-from":[{from:el()}],"gradient-via":[{via:el()}],"gradient-to":[{to:el()}],rounded:[{rounded:em()}],"rounded-s":[{"rounded-s":em()}],"rounded-e":[{"rounded-e":em()}],"rounded-t":[{"rounded-t":em()}],"rounded-r":[{"rounded-r":em()}],"rounded-b":[{"rounded-b":em()}],"rounded-l":[{"rounded-l":em()}],"rounded-ss":[{"rounded-ss":em()}],"rounded-se":[{"rounded-se":em()}],"rounded-ee":[{"rounded-ee":em()}],"rounded-es":[{"rounded-es":em()}],"rounded-tl":[{"rounded-tl":em()}],"rounded-tr":[{"rounded-tr":em()}],"rounded-br":[{"rounded-br":em()}],"rounded-bl":[{"rounded-bl":em()}],"border-w":[{border:ex()}],"border-w-x":[{"border-x":ex()}],"border-w-y":[{"border-y":ex()}],"border-w-s":[{"border-s":ex()}],"border-w-e":[{"border-e":ex()}],"border-w-bs":[{"border-bs":ex()}],"border-w-be":[{"border-be":ex()}],"border-w-t":[{"border-t":ex()}],"border-w-r":[{"border-r":ex()}],"border-w-b":[{"border-b":ex()}],"border-w-l":[{"border-l":ex()}],"divide-x":[{"divide-x":ex()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":ex()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...eu(),"hidden","none"]}],"divide-style":[{divide:[...eu(),"hidden","none"]}],"border-color":[{border:el()}],"border-color-x":[{"border-x":el()}],"border-color-y":[{"border-y":el()}],"border-color-s":[{"border-s":el()}],"border-color-e":[{"border-e":el()}],"border-color-bs":[{"border-bs":el()}],"border-color-be":[{"border-be":el()}],"border-color-t":[{"border-t":el()}],"border-color-r":[{"border-r":el()}],"border-color-b":[{"border-b":el()}],"border-color-l":[{"border-l":el()}],"divide-color":[{divide:el()}],"outline-style":[{outline:[...eu(),"none","hidden"]}],"outline-offset":[{"outline-offset":[S,Q,M]}],"outline-w":[{outline:["",S,$,H]}],"outline-color":[{outline:el()}],shadow:[{shadow:["","none",c,ee,Z]}],"shadow-color":[{shadow:el()}],"inset-shadow":[{"inset-shadow":["none",p,ee,Z]}],"inset-shadow-color":[{"inset-shadow":el()}],"ring-w":[{ring:ex()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:el()}],"ring-offset-w":[{"ring-offset":[S,H]}],"ring-offset-color":[{"ring-offset":el()}],"inset-ring-w":[{"inset-ring":ex()}],"inset-ring-color":[{"inset-ring":el()}],"text-shadow":[{"text-shadow":["none",m,ee,Z]}],"text-shadow-color":[{"text-shadow":el()}],opacity:[{opacity:[S,Q,M]}],"mix-blend":[{"mix-blend":[...eh(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":eh()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[S]}],"mask-image-linear-from-pos":[{"mask-linear-from":eb()}],"mask-image-linear-to-pos":[{"mask-linear-to":eb()}],"mask-image-linear-from-color":[{"mask-linear-from":el()}],"mask-image-linear-to-color":[{"mask-linear-to":el()}],"mask-image-t-from-pos":[{"mask-t-from":eb()}],"mask-image-t-to-pos":[{"mask-t-to":eb()}],"mask-image-t-from-color":[{"mask-t-from":el()}],"mask-image-t-to-color":[{"mask-t-to":el()}],"mask-image-r-from-pos":[{"mask-r-from":eb()}],"mask-image-r-to-pos":[{"mask-r-to":eb()}],"mask-image-r-from-color":[{"mask-r-from":el()}],"mask-image-r-to-color":[{"mask-r-to":el()}],"mask-image-b-from-pos":[{"mask-b-from":eb()}],"mask-image-b-to-pos":[{"mask-b-to":eb()}],"mask-image-b-from-color":[{"mask-b-from":el()}],"mask-image-b-to-color":[{"mask-b-to":el()}],"mask-image-l-from-pos":[{"mask-l-from":eb()}],"mask-image-l-to-pos":[{"mask-l-to":eb()}],"mask-image-l-from-color":[{"mask-l-from":el()}],"mask-image-l-to-color":[{"mask-l-to":el()}],"mask-image-x-from-pos":[{"mask-x-from":eb()}],"mask-image-x-to-pos":[{"mask-x-to":eb()}],"mask-image-x-from-color":[{"mask-x-from":el()}],"mask-image-x-to-color":[{"mask-x-to":el()}],"mask-image-y-from-pos":[{"mask-y-from":eb()}],"mask-image-y-to-pos":[{"mask-y-to":eb()}],"mask-image-y-from-color":[{"mask-y-from":el()}],"mask-image-y-to-color":[{"mask-y-to":el()}],"mask-image-radial":[{"mask-radial":[Q,M]}],"mask-image-radial-from-pos":[{"mask-radial-from":eb()}],"mask-image-radial-to-pos":[{"mask-radial-to":eb()}],"mask-image-radial-from-color":[{"mask-radial-from":el()}],"mask-image-radial-to-color":[{"mask-radial-to":el()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":k()}],"mask-image-conic-pos":[{"mask-conic":[S]}],"mask-image-conic-from-pos":[{"mask-conic-from":eb()}],"mask-image-conic-to-pos":[{"mask-conic-to":eb()}],"mask-image-conic-from-color":[{"mask-conic-from":el()}],"mask-image-conic-to-color":[{"mask-conic-to":el()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:ed()}],"mask-repeat":[{mask:en()}],"mask-size":[{mask:ec()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",Q,M]}],filter:[{filter:["","none",Q,M]}],blur:[{blur:ef()}],brightness:[{brightness:[S,Q,M]}],contrast:[{contrast:[S,Q,M]}],"drop-shadow":[{"drop-shadow":["","none",x,ee,Z]}],"drop-shadow-color":[{"drop-shadow":el()}],grayscale:[{grayscale:["",S,Q,M]}],"hue-rotate":[{"hue-rotate":[S,Q,M]}],invert:[{invert:["",S,Q,M]}],saturate:[{saturate:[S,Q,M]}],sepia:[{sepia:["",S,Q,M]}],"backdrop-filter":[{"backdrop-filter":["","none",Q,M]}],"backdrop-blur":[{"backdrop-blur":ef()}],"backdrop-brightness":[{"backdrop-brightness":[S,Q,M]}],"backdrop-contrast":[{"backdrop-contrast":[S,Q,M]}],"backdrop-grayscale":[{"backdrop-grayscale":["",S,Q,M]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[S,Q,M]}],"backdrop-invert":[{"backdrop-invert":["",S,Q,M]}],"backdrop-opacity":[{"backdrop-opacity":[S,Q,M]}],"backdrop-saturate":[{"backdrop-saturate":[S,Q,M]}],"backdrop-sepia":[{"backdrop-sepia":["",S,Q,M]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":N()}],"border-spacing-x":[{"border-spacing-x":N()}],"border-spacing-y":[{"border-spacing-y":N()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Q,M]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[S,"initial",Q,M]}],ease:[{ease:["linear","initial",f,Q,M]}],delay:[{delay:[S,Q,M]}],animate:[{animate:["none",g,Q,M]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[h,Q,M]}],"perspective-origin":[{"perspective-origin":y()}],rotate:[{rotate:eg()}],"rotate-x":[{"rotate-x":eg()}],"rotate-y":[{"rotate-y":eg()}],"rotate-z":[{"rotate-z":eg()}],scale:[{scale:ej()}],"scale-x":[{"scale-x":ej()}],"scale-y":[{"scale-y":ej()}],"scale-z":[{"scale-z":ej()}],"scale-3d":["scale-3d"],skew:[{skew:ev()}],"skew-x":[{"skew-x":ev()}],"skew-y":[{"skew-y":ev()}],transform:[{transform:[Q,M,"","none","gpu","cpu"]}],"transform-origin":[{origin:y()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:ek()}],"translate-x":[{"translate-x":ek()}],"translate-y":[{"translate-y":ek()}],"translate-z":[{"translate-z":ek()}],"translate-none":["translate-none"],accent:[{accent:el()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:el()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Q,M]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":N()}],"scroll-mx":[{"scroll-mx":N()}],"scroll-my":[{"scroll-my":N()}],"scroll-ms":[{"scroll-ms":N()}],"scroll-me":[{"scroll-me":N()}],"scroll-mbs":[{"scroll-mbs":N()}],"scroll-mbe":[{"scroll-mbe":N()}],"scroll-mt":[{"scroll-mt":N()}],"scroll-mr":[{"scroll-mr":N()}],"scroll-mb":[{"scroll-mb":N()}],"scroll-ml":[{"scroll-ml":N()}],"scroll-p":[{"scroll-p":N()}],"scroll-px":[{"scroll-px":N()}],"scroll-py":[{"scroll-py":N()}],"scroll-ps":[{"scroll-ps":N()}],"scroll-pe":[{"scroll-pe":N()}],"scroll-pbs":[{"scroll-pbs":N()}],"scroll-pbe":[{"scroll-pbe":N()}],"scroll-pt":[{"scroll-pt":N()}],"scroll-pr":[{"scroll-pr":N()}],"scroll-pb":[{"scroll-pb":N()}],"scroll-pl":[{"scroll-pl":N()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Q,M]}],fill:[{fill:["none",...el()]}],"stroke-w":[{stroke:[S,$,H,K]}],stroke:[{stroke:["none",...el()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}}),ex=(...e)=>e.filter((e,r,s)=>!!e&&""!==e.trim()&&s.indexOf(e)===r).join(" ").trim();var eu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let eh=(0,s.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:a="",children:i,iconNode:l,...d},n)=>(0,s.createElement)("svg",{ref:n,...eu,width:r,height:r,stroke:e,strokeWidth:o?24*Number(t)/Number(r):t,className:ex("lucide",a),...d},[...l.map(([e,r])=>(0,s.createElement)(e,r)),...Array.isArray(i)?i:[i]])),eb=(e,r)=>{let t=(0,s.forwardRef)(({className:t,...o},a)=>(0,s.createElement)(eh,{ref:a,iconNode:r,className:ex(`lucide-${e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,t),...o}));return t.displayName=`${e}`,t},ef=eb("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]),eg=eb("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]),ej=eb("FileCode",[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]]),ev=eb("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]),ek=eb("Server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]),ey=eb("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),ew=eb("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),eP=eb("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),eN=eb("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),eI=eb("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),eT=eb("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),eA=eb("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]),eS=eb("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),ez=eb("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]),eE=eb("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]),eC={zh:{title:"Nata API 设计规范手册",subtitle:"内部开发参考文档",langSwitch:"日本語",tabs:{overview:"概述","url-naming":"URL命名","http-methods":"HTTP方法",parameters:"参数规范",response:"响应格式","auth-architecture":"认证架构",implementation:"NestJS实现","best-practices":"最佳实践"}},ja:{title:"Nata API設計仕様書",subtitle:"内部開発参照ドキュメント",langSwitch:"中文",tabs:{overview:"概要","url-naming":"URL命名","http-methods":"HTTPメソッド",parameters:"パラメータ仕様",response:"レスポンス形式","auth-architecture":"認証アーキテクチャ",implementation:"NestJS実装","best-practices":"ベストプラクティス"}}};function eD(){let[e,t]=(0,s.useState)("zh"),[o,a]=(0,s.useState)("overview"),i=eC[e],l=[{id:"overview",icon:(0,r.jsx)(ef,{className:"h-4 w-4"})},{id:"url-naming",icon:(0,r.jsx)(eg,{className:"h-4 w-4"})},{id:"http-methods",icon:(0,r.jsx)(ej,{className:"h-4 w-4"})},{id:"parameters",icon:(0,r.jsx)(ez,{className:"h-4 w-4"})},{id:"response",icon:(0,r.jsx)(ek,{className:"h-4 w-4"})},{id:"auth-architecture",icon:(0,r.jsx)(ev,{className:"h-4 w-4"})},{id:"implementation",icon:(0,r.jsx)(eE,{className:"h-4 w-4"})},{id:"best-practices",icon:(0,r.jsx)(eP,{className:"h-4 w-4"})}];return(0,r.jsxs)("div",{className:"min-h-screen bg-background",children:[(0,r.jsx)("header",{className:"sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60",children:(0,r.jsxs)("div",{className:"mx-auto flex max-w-6xl items-center justify-between px-6 py-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-xl font-semibold text-foreground",children:i.title}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:i.subtitle})]}),(0,r.jsxs)("button",{onClick:()=>t("zh"===e?"ja":"zh"),className:"flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent",children:[(0,r.jsx)(eg,{className:"h-4 w-4"}),i.langSwitch]})]})}),(0,r.jsx)("div",{className:"mx-auto max-w-6xl px-6 py-6",children:(0,r.jsxs)("div",{className:"flex gap-6",children:[(0,r.jsx)("nav",{className:"sticky top-24 h-fit w-56 shrink-0",children:(0,r.jsx)("ul",{className:"space-y-1",children:l.map(e=>(0,r.jsx)("li",{children:(0,r.jsxs)("button",{onClick:()=>a(e.id),className:function(...e){return em(function(){for(var e,r,s=0,t="",o=arguments.length;s<o;s++)(e=arguments[s])&&(r=function e(r){var s,t,o="";if("string"==typeof r||"number"==typeof r)o+=r;else if("object"==typeof r)if(Array.isArray(r)){var a=r.length;for(s=0;s<a;s++)r[s]&&(t=e(r[s]))&&(o&&(o+=" "),o+=t)}else for(t in r)r[t]&&(o&&(o+=" "),o+=t);return o}(e))&&(t&&(t+=" "),t+=r);return t}(e))}("flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",o===e.id?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-accent hover:text-accent-foreground"),children:[e.icon,i.tabs[e.id]]})},e.id))})}),(0,r.jsx)("main",{className:"min-w-0 flex-1",children:(0,r.jsxs)("div",{className:"rounded-lg border border-border bg-card p-8",children:["overview"===o&&(0,r.jsx)(eK,{lang:e}),"url-naming"===o&&(0,r.jsx)(eB,{lang:e}),"http-methods"===o&&(0,r.jsx)(eW,{lang:e}),"parameters"===o&&(0,r.jsx)(e_,{lang:e}),"response"===o&&(0,r.jsx)(eJ,{lang:e}),"auth-architecture"===o&&(0,r.jsx)(eZ,{lang:e}),"implementation"===o&&(0,r.jsx)(eQ,{lang:e}),"best-practices"===o&&(0,r.jsx)(e$,{lang:e})]})})]})})]})}function eR({children:e,title:s}){return(0,r.jsxs)("div",{className:"overflow-hidden rounded-md border border-border bg-code-bg",children:[s&&(0,r.jsx)("div",{className:"border-b border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground",children:s}),(0,r.jsx)("pre",{className:"overflow-x-auto p-4 text-sm text-code-foreground",children:(0,r.jsx)("code",{children:e})})]})}function eG({children:e}){return(0,r.jsx)("h2",{className:"mb-6 text-2xl font-semibold text-foreground",children:e})}function eO({title:e,children:s}){return(0,r.jsxs)("div",{className:"mb-8",children:[(0,r.jsx)("h3",{className:"mb-4 text-lg font-medium text-foreground",children:e}),s]})}function eq({children:e}){return(0,r.jsx)("p",{className:"mb-4 leading-relaxed text-muted-foreground",children:e})}function eU({items:e}){return(0,r.jsx)("ul",{className:"mb-4 space-y-2",children:e.map((e,s)=>(0,r.jsxs)("li",{className:"flex items-start gap-2 text-muted-foreground",children:[(0,r.jsx)(ew,{className:"mt-1 h-4 w-4 shrink-0 text-primary"}),(0,r.jsx)("span",{children:e})]},s))})}function eL({headers:e,rows:s}){return(0,r.jsx)("div",{className:"mb-4 overflow-x-auto",children:(0,r.jsxs)("table",{className:"w-full border-collapse text-sm",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"border-b border-border bg-muted/50",children:e.map((e,s)=>(0,r.jsx)("th",{className:"px-4 py-3 text-left font-medium text-foreground",children:e},s))})}),(0,r.jsx)("tbody",{children:s.map((e,s)=>(0,r.jsx)("tr",{className:"border-b border-border",children:e.map((e,s)=>(0,r.jsx)("td",{className:"px-4 py-3 text-muted-foreground",children:e},s))},s))})]})})}function eM({good:e,bad:s,lang:t}){let o={zh:{good:"正确",bad:"错误"},ja:{good:"正しい",bad:"誤り"}};return(0,r.jsxs)("div",{className:"mb-4 grid gap-4 md:grid-cols-2",children:[(0,r.jsxs)("div",{className:"rounded-md border border-success/30 bg-success/10 p-4",children:[(0,r.jsxs)("div",{className:"mb-2 flex items-center gap-2 font-medium text-success",children:[(0,r.jsx)(eP,{className:"h-4 w-4"}),o[t].good]}),e.map((e,s)=>(0,r.jsx)("code",{className:"mb-1 block text-sm text-foreground",children:e},s))]}),(0,r.jsxs)("div",{className:"rounded-md border border-destructive/30 bg-destructive/10 p-4",children:[(0,r.jsxs)("div",{className:"mb-2 flex items-center gap-2 font-medium text-destructive",children:[(0,r.jsx)(eN,{className:"h-4 w-4"}),o[t].bad]}),s.map((e,s)=>(0,r.jsx)("code",{className:"mb-1 block text-sm text-foreground",children:e},s))]})]})}function eH({lang:e}){let s="zh"===e;return(0,r.jsx)("div",{className:"mx-auto my-8 w-full max-w-xl select-none",children:(0,r.jsxs)("div",{className:"overflow-hidden rounded-xl border border-border bg-card shadow-sm",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-2",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)(ev,{className:"h-4 w-4 text-primary"}),(0,r.jsx)("span",{className:"text-xs font-bold text-foreground",children:s?"Public API 认证流转图":"Public API 認証フロー図"})]}),(0,r.jsx)("span",{className:"font-mono text-[9px] text-muted-foreground opacity-70",children:"DIRECT ACCESS MODEL"})]}),(0,r.jsxs)("div",{className:"relative h-[240px] w-full bg-slate-50/50 dark:bg-slate-950/20",children:[(0,r.jsxs)("svg",{className:"absolute inset-0 h-full w-full overflow-visible pointer-events-none",preserveAspectRatio:"none",children:[(0,r.jsxs)("defs",{children:[(0,r.jsx)("marker",{id:"arrow-blue",markerWidth:"8",markerHeight:"8",refX:"7",refY:"4",orientation:"auto",children:(0,r.jsx)("path",{d:"M0,0 L8,4 L0,8 Z",fill:"#60a5fa"})}),(0,r.jsx)("marker",{id:"arrow-mixed",markerWidth:"8",markerHeight:"8",refX:"7",refY:"4",orientation:"auto",children:(0,r.jsx)("path",{d:"M0,0 L8,4 L0,8 Z",fill:"#f59e0b"})})]}),(0,r.jsx)("line",{x1:"160",y1:"60",x2:"410",y2:"110",stroke:"#60a5fa",strokeWidth:"2",strokeDasharray:"6 4",markerEnd:"url(#arrow-blue)"}),(0,r.jsx)("line",{x1:"160",y1:"180",x2:"410",y2:"130",stroke:"#f59e0b",strokeWidth:"2",strokeDasharray:"6 4",markerEnd:"url(#arrow-mixed)"})]}),(0,r.jsx)("div",{className:"absolute left-[30px] top-[30px] w-32",children:(0,r.jsxs)("div",{className:"flex flex-col items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/80 p-3 shadow-sm backdrop-blur-sm dark:bg-blue-950/30",children:[(0,r.jsx)(ek,{className:"h-5 w-5 text-blue-500"}),(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"text-[10px] font-bold text-blue-700 dark:text-blue-300",children:s?"外部集成系统":"外部連携システム"}),(0,r.jsx)("div",{className:"text-[8px] text-blue-500/70",children:"3rd Party Server"})]})]})}),(0,r.jsx)("div",{className:"absolute left-[30px] top-[150px] w-32",children:(0,r.jsxs)("div",{className:"flex flex-col items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 shadow-sm backdrop-blur-sm",children:[(0,r.jsx)(eS,{className:"h-5 w-5 text-primary"}),(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"text-[10px] font-bold text-primary",children:s?"官方客户端":"公式クライアント"}),(0,r.jsx)("div",{className:"text-[8px] text-muted-foreground",children:"JS API / Custom"})]})]})}),(0,r.jsx)("div",{className:"absolute right-[40px] top-[50%] w-40 -translate-y-1/2",children:(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-background p-5 shadow-lg",children:[(0,r.jsx)("div",{className:"text-sm font-bold italic text-primary",children:"Public API"}),(0,r.jsx)("div",{className:"mt-1 font-mono text-[10px] text-muted-foreground",children:"/api/v1/*"})]})}),(0,r.jsx)("div",{className:"absolute left-[240px] top-[75px] -translate-x-1/2 -translate-y-1/2 rotate-[12deg]",children:(0,r.jsx)("span",{className:"rounded bg-background px-1.5 py-0.5 text-[9px] font-bold text-blue-500 shadow-sm border border-blue-100",children:"API Token"})}),(0,r.jsx)("div",{className:"absolute left-[240px] top-[165px] -translate-x-1/2 -translate-y-1/2 -rotate-[12deg]",children:(0,r.jsxs)("div",{className:"flex items-center gap-1.5 rounded bg-background px-2 py-1 shadow-sm border border-orange-100",children:[(0,r.jsxs)("span",{className:"flex items-center gap-1 text-[9px] font-bold text-green-600",children:[(0,r.jsx)(eT,{className:"h-3 w-3"})," Session"]}),(0,r.jsx)("span",{className:"text-[9px] text-muted-foreground/50",children:"/"}),(0,r.jsxs)("span",{className:"flex items-center gap-1 text-[9px] font-bold text-orange-500",children:[(0,r.jsx)(eA,{className:"h-3 w-3"})," Token"]})]})})]})]})})}function eK({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"概述与核心原则"}),(0,r.jsx)(eq,{children:"本文档定义了 Nata 项目中后端 API 接口的设计规范。所有新增和维护的 API 均需遵循此标准，以确保系统的一致性、可维护性和易用性。"}),(0,r.jsx)(eO,{title:"核心原则",children:(0,r.jsx)("div",{className:"grid gap-4 md:grid-cols-2",children:[{title:"RESTful 优先",desc:"资源导向设计，URL 代表「资源」，HTTP Method 代表「动作」"},{title:"语义清晰",desc:"接口路径和参数应具有明确的业务含义，优先使用英语名词"},{title:"扁平化与关联",desc:"强依赖用嵌套，弱关联用打平；不要为了表达关系而无限加深 URL 路径"},{title:"一致性",desc:"整个系统的分页、筛选、错误码格式必须完全统一"}].map((e,s)=>(0,r.jsxs)("div",{className:"rounded-md border border-border bg-muted/30 p-4",children:[(0,r.jsx)("h4",{className:"mb-2 font-medium text-foreground",children:e.title}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:e.desc})]},s))})}),(0,r.jsx)(eO,{title:"与业界产品对比",children:(0,r.jsx)(eL,{headers:["产品","API 风格","示例"],rows:[["Kintone","查询参数传资源ID","GET /k/v1/records.json?app=123"],["Airtable","路径嵌套","GET /v0/{baseId}/{tableId}"],["Notion","扁平 + 过滤","POST /v1/databases/{id}/query"],["Nata","路径嵌套","GET /api/apps/{appId}/records"]]})}),(0,r.jsxs)(eO,{title:"Private API vs Public API",children:[(0,r.jsxs)(eq,{children:["Private API 仅支持内部客户端通过 Cookie (Session) 认证； 而 Public API 支持",(0,r.jsx)("strong",{children:"全场景混合认证"}),"。外部系统主要使用 API Token (Bearer Token)，而内部 JS SDK 则可灵活选择 Cookie 或 API Token。"]}),(0,r.jsx)(eL,{headers:["特征","Private API (非公開)","Public API (公開)"],rows:[["受众","官方客户端 (PC/Mobile/MP)","第三方系统、集成脚本、内部 JS SDK"],["稳定性","可能频繁变更","极端注重兼容性"],["版本控制","通常不严格区分版本","强制版本化 (/v1/, /v2/)"],["限流策略","较宽松","严格限流 (基于 App 与 Token)"],["认证方式","仅 Cookie (Session)","Cookie (Session) 或 API Token"],["路径前缀","/api/...","/api/v1/..."]]}),(0,r.jsxs)("div",{className:"mt-6 rounded-md border border-border bg-muted/50 p-4",children:[(0,r.jsx)("h4",{className:"mb-2 font-medium text-foreground",children:"架构优势：底层统一"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"虽然访问层物理隔离，但 Private 与 Public API 共享同一套 Service 层逻辑。这意味着业务更新双侧同步生效，且内部接口公开化只需增加路由与 DTO 过滤，极大降低维护成本并确保行为一致。"})]})]})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"概要とコア原則"}),(0,r.jsx)(eq,{children:"本ドキュメントは、Nata プロジェクトにおけるバックエンドAPI設計仕様を定義します。すべての新規・保守APIはこの標準に従い、システムの一貫性、保守性、使いやすさを確保します。"}),(0,r.jsx)(eO,{title:"コア原則",children:(0,r.jsx)("div",{className:"grid gap-4 md:grid-cols-2",children:[{title:"RESTful優先",desc:"リソース指向設計。URLは「リソース」、HTTPメソッドは「アクション」を表す"},{title:"セマンティクスの明確化",desc:"パスとパラメータは明確なビジネス意味を持ち、英語名詞を優先使用"},{title:"フラット化と関連",desc:"強い依存関係はネスト、弱い関連はフラット化。URL階層を無限に深くしない"},{title:"一貫性",desc:"ページネーション、フィルタリング、エラーコード形式はシステム全体で統一"}].map((e,s)=>(0,r.jsxs)("div",{className:"rounded-md border border-border bg-muted/30 p-4",children:[(0,r.jsx)("h4",{className:"mb-2 font-medium text-foreground",children:e.title}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:e.desc})]},s))})}),(0,r.jsx)(eO,{title:"業界製品との比較",children:(0,r.jsx)(eL,{headers:["製品","APIスタイル","例"],rows:[["Kintone","クエリパラメータでリソースID","GET /k/v1/records.json?app=123"],["Airtable","パスネスト","GET /v0/{baseId}/{tableId}"],["Notion","フラット + フィルタ","POST /v1/databases/{id}/query"],["Nata","パスネスト","GET /api/apps/{appId}/records"]]})}),(0,r.jsxs)(eO,{title:"Private API vs Public API",children:[(0,r.jsxs)(eq,{children:["Private API は内部クライアントからの Cookie (Session) 認証のみをサポートします。 一方、Public API は",(0,r.jsx)("strong",{children:"全シナリオでの混合認証"}),"をサポートします。外部システムは主に API Token (Bearer Token) を使用し、内部 JS SDK は状況に応じて Cookie または API Token を選択できます。"]}),(0,r.jsx)(eL,{headers:["特徴","Private API (非公開)","Public API (公開)"],rows:[["対象","公式クライアント (PC/Mobile/MP) のみ","サードパーティシステム、内部 JS SDK"],["安定性","頻繁に変更可能","互換性を極めて重視"],["バージョン管理","通常バージョン区別なし","必須バージョン化 (/v1/, /v2/)"],["レート制限","緩め","厳格な制限 (App と Token に基づく)"],["認証方式","Cookie (Session) のみ","Cookie (Session) または API Token"],["パスプレフィックス","/api/...","/api/v1/..."]]}),(0,r.jsxs)("div",{className:"mt-6 rounded-md border border-border bg-muted/50 p-4",children:[(0,r.jsx)("h4",{className:"mb-2 font-medium text-foreground",children:"アーキテクチャの利点：基盤統一"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"アクセス層は分離されていますが、InternalとExternal APIは同一のService層ロジックを共有しています。これにより、ビジネスロジックの更新は双方に即座に反映され、非公開APIの公開化もルーティングとDTOフィルタの追加のみで済むため、保守コストを削減しつつ挙動の一致を保証します。"})]})]})]})}function eB({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"URL 命名规范"}),(0,r.jsxs)(eO,{title:"基本规则",children:[(0,r.jsx)(eU,{items:["全小写，连字符分隔 (Kebab-case)","资源使用复数名词","层级结构: 集合 → ID → 子资源"]}),(0,r.jsx)(eM,{lang:e,good:["/api/v1/user-profiles","/api/apps","/api/users"],bad:["/api/v1/userProfiles","/api/app","/api/userList"]})]}),(0,r.jsx)(eO,{title:"路由层级结构",children:(0,r.jsx)(eR,{title:"路由结构示例",children:`/api                           # 非公开 API 根路径
├── /auth/*                    # 认证相关
├── /apps                      # 应用资源
│   ├── GET    /               # 应用列表
│   ├── POST   /               # 创建应用
│   └── /:appId                # 单个应用
│       ├── GET    /           # 应用详情
│       ├── PUT    /           # 更新应用
│       ├── DELETE /           # 删除应用
│       └── /records           # 记录子资源
│           ├── GET    /       # 记录列表
│           ├── POST   /       # 创建记录
│           └── /:recordId     # 单条记录

/api/v1                        # 公开 API 根路径 (版本化)
└── /apps/:appId/records/*     # 外部记录 API`})}),(0,r.jsx)(eO,{title:"命名示例",children:(0,r.jsx)(eM,{lang:e,good:["GET /api/apps                    # 复数名词表示集合","GET /api/apps/:appId             # 单数资源","GET /api/apps/:appId/records     # 子资源集合","POST /api/apps/:appId/records/search  # 动词仅用于非CRUD"],bad:["GET /api/getApps                 # 不要在 URL 中用动词","GET /api/app/:appId              # 集合应使用复数","POST /api/apps/:appId/createRecord  # POST 本身表示创建","GET /api/records?appId=123       # 子资源应嵌套在父资源下"]})})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"URL命名規則"}),(0,r.jsxs)(eO,{title:"基本ルール",children:[(0,r.jsx)(eU,{items:["全て小文字、ハイフン区切り (Kebab-case)","リソースは複数形名詞を使用","階層構造: コレクション → ID → サブリソース"]}),(0,r.jsx)(eM,{lang:e,good:["/api/v1/user-profiles","/api/apps","/api/users"],bad:["/api/v1/userProfiles","/api/app","/api/userList"]})]}),(0,r.jsx)(eO,{title:"ルート階層構造",children:(0,r.jsx)(eR,{title:"ルート構造例",children:`/api                           # 非公開API ルートパス
├── /auth/*                    # 認証関連
├── /apps                      # アプリリソース
│   ├── GET    /               # アプリ一覧
│   ├── POST   /               # アプリ作成
│   └── /:appId                # 単一アプリ
│       ├── GET    /           # アプリ詳細
│       ├── PUT    /           # アプリ更新
│       ├── DELETE /           # アプリ削除
│       └── /records           # レコードサブリソース
│           ├── GET    /       # レコード一覧
│           ├── POST   /       # レコード作成
│           └── /:recordId     # 単一レコード

/api/v1                        # 外部API ルートパス (バージョン化)
└── /apps/:appId/records/*     # 外部レコードAPI`})}),(0,r.jsx)(eO,{title:"命名例",children:(0,r.jsx)(eM,{lang:e,good:["GET /api/apps                    # 複数形名詞でコレクション","GET /api/apps/:appId             # 単一リソース","GET /api/apps/:appId/records     # サブリソースコレクション","POST /api/apps/:appId/records/search  # 動詞は非CRUDのみ"],bad:["GET /api/getApps                 # URLに動詞を使わない","GET /api/app/:appId              # コレクションは複数形","POST /api/apps/:appId/createRecord  # POST自体が作成を表す","GET /api/records?appId=123       # サブリソースは親にネスト"]})})]})}function eW({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"HTTP 方法规范"}),(0,r.jsx)(eO,{title:"方法语义",children:(0,r.jsx)(eL,{headers:["方法","用途","幂等性","Body","示例"],rows:[["GET","读取资源详情或列表","是","严禁","GET /users, GET /users/1"],["POST","创建资源 / 复杂动作","否","必须","POST /users, POST /users/search"],["PUT","完全替换资源","是","必须","PUT /configs/system"],["PATCH","部分更新资源 (推荐)","否","必须","PATCH /users/1"],["DELETE","删除资源","是","不建议","DELETE /users/1"]]})}),(0,r.jsx)(eO,{title:"使用示例",children:(0,r.jsx)(eR,{title:"CRUD 操作示例",children:`// 创建资源 - POST
POST /api/apps/:appId/records
{ "values": { "title": "新记录" } }
// 返回 201 Created + 新资源

// 全量更新 - PUT (替换整个资源)
PUT /api/apps/:appId/records/:recordId
{ "values": { "title": "更新标题", "status": "done" } }
// 返回 200 OK + 更新后的资源

// 部分更新 - PATCH (仅更新指定字段)
PATCH /api/apps/:appId/records/:recordId
{ "values": { "status": "done" } }
// 返回 200 OK + 更新后的资源

// 删除资源 - DELETE
DELETE /api/apps/:appId/records/:recordId
// 返回 200 OK 或 204 No Content`})}),(0,r.jsx)(eO,{title:"批量操作",children:(0,r.jsx)(eR,{title:"批量删除示例",children:`// 非公开 API - 批量删除
DELETE /api/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }

// 公开 API - 批量删除 (保持一致性)
DELETE /api/v1/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }`})})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"HTTPメソッド仕様"}),(0,r.jsx)(eO,{title:"メソッドセマンティクス",children:(0,r.jsx)(eL,{headers:["メソッド","用途","冪等性","Body","例"],rows:[["GET","リソース詳細/一覧取得","はい","禁止","GET /users, GET /users/1"],["POST","リソース作成 / 複雑操作","いいえ","必須","POST /users, POST /users/search"],["PUT","リソース完全置換","はい","必須","PUT /configs/system"],["PATCH","部分更新 (推奨)","いいえ","必須","PATCH /users/1"],["DELETE","リソース削除","はい","非推奨","DELETE /users/1"]]})}),(0,r.jsx)(eO,{title:"使用例",children:(0,r.jsx)(eR,{title:"CRUD操作例",children:`// リソース作成 - POST
POST /api/apps/:appId/records
{ "values": { "title": "新規レコード" } }
// 201 Created + 新リソースを返す

// 全量更新 - PUT (リソース全体を置換)
PUT /api/apps/:appId/records/:recordId
{ "values": { "title": "更新タイトル", "status": "done" } }
// 200 OK + 更新後のリソースを返す

// 部分更新 - PATCH (指定フィールドのみ)
PATCH /api/apps/:appId/records/:recordId
{ "values": { "status": "done" } }
// 200 OK + 更新後のリソースを返す

// リソース削除 - DELETE
DELETE /api/apps/:appId/records/:recordId
// 200 OK または 204 No Contentを返す`})}),(0,r.jsx)(eO,{title:"バッチ操作",children:(0,r.jsx)(eR,{title:"バッチ削除例",children:`// 非公開API - バッチ削除
DELETE /api/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }

// 外部API - バッチ削除 (一貫性を保持)
DELETE /api/v1/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }`})})]})}function e_({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"参数传递规范"}),(0,r.jsxs)("div",{className:"mb-6 rounded-md border border-warning/30 bg-warning/10 p-4",children:[(0,r.jsxs)("div",{className:"mb-2 flex items-center gap-2 font-medium text-warning",children:[(0,r.jsx)(eI,{className:"h-5 w-5"}),"黄金法则：ID 进 Path，条件进 Query"]}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"这是开发者最容易混淆的部分，请严格遵守"})]}),(0,r.jsxs)(eO,{title:"Path Params (路径参数)",children:[(0,r.jsx)(eq,{children:"用途：唯一标识资源。场景：AppID, UserID, RecordID 等核心定位符。"}),(0,r.jsx)(eM,{lang:e,good:["GET /users/1001  # 我要找 1001 号用户"],bad:["GET /users?id=1001  # 过时写法"]})]}),(0,r.jsxs)(eO,{title:"Query Params (查询参数)",children:[(0,r.jsx)(eq,{children:"用途：筛选、分页、排序、视图修饰。"}),(0,r.jsx)(eR,{title:"查询参数示例",children:`// 筛选
GET /api/apps/:appId/records?status=active&deptId=xxx

// 分页
?limit=20&offset=0

// 排序
?sort=-createdAt

// 字段选择
?fields=id,name`})]}),(0,r.jsxs)(eO,{title:"Request Body (请求体)",children:[(0,r.jsx)(eq,{children:"用途：传输业务数据。通常用于 Create (POST) 和 Update (PATCH)。格式：统一使用 application/json。"}),(0,r.jsx)(eR,{title:"请求体示例",children:`// 创建/更新记录
{
  "values": {
    "title": "记录标题",
    "status": "pending",
    "assignee": ["user-1", "user-2"]
  }
}

// 条件搜索
{
  "conditions": [
    { "field": "status", "operator": "eq", "value": "done" },
    { "field": "createdAt", "operator": "gte", "value": "2024-01-01" }
  ],
  "limit": 20,
  "offset": 0
}`})]}),(0,r.jsx)(eO,{title:"条件操作符",children:(0,r.jsx)(eL,{headers:["操作符","说明","示例"],rows:[["eq / equals","等于",'{ "field": "status", "operator": "eq", "value": "done" }'],["ne / neq","不等于",'{ "field": "status", "operator": "ne", "value": "cancelled" }'],["gt / gte","大于 / 大于等于",'{ "field": "amount", "operator": "gt", "value": 100 }'],["lt / lte","小于 / 小于等于",'{ "field": "amount", "operator": "lt", "value": 1000 }'],["contains","包含",'{ "field": "title", "operator": "contains", "value": "重要" }'],["in","在列表中",'{ "field": "status", "operator": "in", "value": ["done", "pending"] }']]})})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"パラメータ仕様"}),(0,r.jsxs)("div",{className:"mb-6 rounded-md border border-warning/30 bg-warning/10 p-4",children:[(0,r.jsxs)("div",{className:"mb-2 flex items-center gap-2 font-medium text-warning",children:[(0,r.jsx)(eI,{className:"h-5 w-5"}),"黄金ルール：IDはPath、条件はQuery"]}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"開発者が最も混同しやすい部分です。厳格に従ってください"})]}),(0,r.jsxs)(eO,{title:"Path Params (パスパラメータ)",children:[(0,r.jsx)(eq,{children:"用途：リソースの一意識別。場景：AppID, UserID, RecordID等のコア識別子。"}),(0,r.jsx)(eM,{lang:e,good:["GET /users/1001  # ユーザー1001を取得"],bad:["GET /users?id=1001  # 古い書き方"]})]}),(0,r.jsxs)(eO,{title:"Query Params (クエリパラメータ)",children:[(0,r.jsx)(eq,{children:"用途：フィルタリング、ページネーション、ソート、ビュー修飾。"}),(0,r.jsx)(eR,{title:"クエリパラメータ例",children:`// フィルタリング
GET /api/apps/:appId/records?status=active&deptId=xxx

// ページネーション
?limit=20&offset=0

// ソート
?sort=-createdAt

// フィールド選択
?fields=id,name`})]}),(0,r.jsxs)(eO,{title:"Request Body (リクエストボディ)",children:[(0,r.jsx)(eq,{children:"用途：ビジネスデータの送信。通常 Create (POST) と Update (PATCH) で使用。形式：application/json統一。"}),(0,r.jsx)(eR,{title:"リクエストボディ例",children:`// レコード作成/更新
{
  "values": {
    "title": "レコードタイトル",
    "status": "pending",
    "assignee": ["user-1", "user-2"]
  }
}

// 条件検索
{
  "conditions": [
    { "field": "status", "operator": "eq", "value": "done" },
    { "field": "createdAt", "operator": "gte", "value": "2024-01-01" }
  ],
  "limit": 20,
  "offset": 0
}`})]}),(0,r.jsx)(eO,{title:"条件演算子",children:(0,r.jsx)(eL,{headers:["演算子","説明","例"],rows:[["eq / equals","等しい",'{ "field": "status", "operator": "eq", "value": "done" }'],["ne / neq","等しくない",'{ "field": "status", "operator": "ne", "value": "cancelled" }'],["gt / gte","より大きい / 以上",'{ "field": "amount", "operator": "gt", "value": 100 }'],["lt / lte","より小さい / 以下",'{ "field": "amount", "operator": "lt", "value": 1000 }'],["contains","含む",'{ "field": "title", "operator": "contains", "value": "重要" }'],["in","リスト内",'{ "field": "status", "operator": "in", "value": ["done", "pending"] }']]})})]})}function eJ({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"响应格式规范"}),(0,r.jsx)(eO,{title:"成功响应",children:(0,r.jsx)(eR,{title:"响应格式示例",children:`// 单资源
{
  "id": "rec_123",
  "appId": "app_456",
  "values": { "title": "记录标题" },
  "createdAt": "2024-01-15T10:30:00Z",
  "createdBy": "user_789"
}

// 集合 + 分页
{
  "data": [
    { "id": "rec_1", ... },
    { "id": "rec_2", ... }
  ],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}

// 操作结果
{
  "success": true,
  "message": "操作成功"
}`})}),(0,r.jsx)(eO,{title:"错误响应",children:(0,r.jsx)(eR,{title:"错误格式示例",children:`// 标准错误格式
{
  "statusCode": 400,
  "message": "请求参数错误",
  "error": "Bad Request",
  "details": [
    { "field": "values.title", "message": "标题不能为空" }
  ]
}

// 认证错误
{
  "statusCode": 401,
  "message": "认证失败: Token 无效",
  "error": "Unauthorized"
}

// 权限错误
{
  "statusCode": 403,
  "message": "无权访问此应用",
  "error": "Forbidden"
}`})}),(0,r.jsx)(eO,{title:"HTTP 状态码",children:(0,r.jsx)(eL,{headers:["状态码","含义","使用场景"],rows:[["200","OK","GET/PUT/PATCH/DELETE 成功"],["201","Created","POST 创建成功"],["204","No Content","DELETE 成功，无返回内容"],["400","Bad Request","请求参数错误"],["401","Unauthorized","未认证或认证失败"],["403","Forbidden","无权限访问"],["404","Not Found","资源不存在"],["409","Conflict","资源冲突 (如唯一性约束)"],["422","Unprocessable Entity","业务规则校验失败"],["429","Too Many Requests","限流"],["500","Private Server Error","服务器内部错误"]]})})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"レスポンス形式仕様"}),(0,r.jsx)(eO,{title:"成功レスポンス",children:(0,r.jsx)(eR,{title:"レスポンス形式例",children:`// 単一リソース
{
  "id": "rec_123",
  "appId": "app_456",
  "values": { "title": "レコードタイトル" },
  "createdAt": "2024-01-15T10:30:00Z",
  "createdBy": "user_789"
}

// コレクション + ページネーション
{
  "data": [
    { "id": "rec_1", ... },
    { "id": "rec_2", ... }
  ],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}

// 操作結果
{
  "success": true,
  "message": "操作成功"
}`})}),(0,r.jsx)(eO,{title:"エラーレスポンス",children:(0,r.jsx)(eR,{title:"エラー形式例",children:`// 標準エラー形式
{
  "statusCode": 400,
  "message": "リクエストパラメータエラー",
  "error": "Bad Request",
  "details": [
    { "field": "values.title", "message": "タイトルは必須です" }
  ]
}

// 認証エラー
{
  "statusCode": 401,
  "message": "認証失敗: Token無効",
  "error": "Unauthorized"
}

// 権限エラー
{
  "statusCode": 403,
  "message": "このアプリへのアクセス権限がありません",
  "error": "Forbidden"
}`})}),(0,r.jsx)(eO,{title:"HTTPステータスコード",children:(0,r.jsx)(eL,{headers:["ステータス","意味","使用場面"],rows:[["200","OK","GET/PUT/PATCH/DELETE 成功"],["201","Created","POST 作成成功"],["204","No Content","DELETE 成功、内容なし"],["400","Bad Request","リクエストパラメータエラー"],["401","Unauthorized","未認証または認証失敗"],["403","Forbidden","アクセス権限なし"],["404","Not Found","リソースが存在しない"],["409","Conflict","リソース競合 (ユニーク制約等)"],["422","Unprocessable Entity","ビジネスルール検証失敗"],["429","Too Many Requests","レート制限"],["500","Private Server Error","サーバー内部エラー"]]})})]})}function eZ({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"认证规范"}),(0,r.jsx)(eq,{children:"Nata 平台支持以下认证方式。认证方式和优先级逻辑参考自 kintone REST API 标准。"}),(0,r.jsx)(eO,{title:"1. 认证方式",children:(0,r.jsx)(eL,{headers:["方式","有效标头 (Header)","使用场景"],rows:[["API Token 认证","Authorization: Bearer <TOKEN>","外部系统集成、自动化脚本、三方服务"],["Session 认证 (Cookie)","Cookie: access_token=... 和 X-Requested-With: XMLHttpRequest","官方客户端 (PC/Mobile/MP)、内部 JS SDK 脚本"]]})}),(0,r.jsxs)(eO,{title:"2. API 类型与支持情况",children:[(0,r.jsx)(eq,{children:"我们根据使用场景对 API 的认证支持进行了差异化设计："}),(0,r.jsx)(eL,{headers:["API 类型","路径前缀","支持认证方式"],rows:[["Private API (非公开)","/api/*","仅 Session (Cookie)"],["Public API (公开)","/api/v1/*","API Token 或 Session (Cookie)"]]}),(0,r.jsxs)("ul",{className:"mb-4 space-y-6",children:[(0,r.jsxs)("li",{className:"flex items-start gap-2 text-muted-foreground",children:[(0,r.jsx)(ew,{className:"mt-1 h-4 w-4 shrink-0 text-primary"}),(0,r.jsxs)("span",{children:[(0,r.jsx)("strong",{className:"text-foreground",children:"Private API："}),"专门服务于官方客户端（包括 PC 端、移动端、小程序等），仅支持用户登录后的 Session 认证方案。"]})]}),(0,r.jsxs)("li",{className:"flex flex-col gap-3",children:[(0,r.jsxs)("div",{className:"flex items-start gap-2 text-muted-foreground",children:[(0,r.jsx)(ew,{className:"mt-1 h-4 w-4 shrink-0 text-primary"}),(0,r.jsxs)("span",{children:[(0,r.jsx)("strong",{className:"text-foreground",children:"Public API："}),"采用混合认证方案以适应多元场景。**外部系统主要使用 API Token (Bearer Token)** 进行集成；而**内部 JS SDK 或第一方客户端**则可根据上下文灵活选择 Session (Cookie) 或 API Token。哪怕是官方客户端，在调用公开 API 时也能利用 Token 机制绕过特定的 Session 限制。"]})]}),(0,r.jsx)(eH,{lang:"zh"})]})]}),(0,r.jsx)("div",{className:"mt-4 rounded-md border border-warning/30 bg-warning/10 p-4",children:(0,r.jsxs)("div",{className:"mb-2 flex items-center gap-2 font-medium text-warning text-sm",children:[(0,r.jsx)(eI,{className:"h-4 w-4"}),"安全提示：Public API 使用 Session 认证时，必须携带 X-Requested-With 标头以防止 CSRF。"]})})]}),(0,r.jsxs)(eO,{title:"3. API 分类与定位",children:[(0,r.jsx)(eq,{children:"为了平衡开发效率与系统的稳定性，我们将 API 分为两类。"}),(0,r.jsx)(eL,{headers:["维度","Private API (非公开)","Public API (公开)"],rows:[["主供对象","官方客户端 (PC/Mobile/MP)","第三方集成、内部 SDK"],["稳定性","可能频繁变更","极端注重兼容性"],["版本管理","无明确版本控制","严格版本化 (/v1/...)"],["限流策略","通常不限流","严格限流 (防止过载)"]]})]}),(0,r.jsxs)(eO,{title:"4. 认证优先级",children:[(0,r.jsx)(eq,{children:"当请求中同时包含多种认证信息时，服务端将按以下优先级进行验证："}),(0,r.jsxs)("div",{className:"flex items-center gap-4 py-4 px-6 bg-muted/30 rounded-md border border-border",children:[(0,r.jsx)("div",{className:"font-semibold text-primary",children:"API Token"}),(0,r.jsx)(ey,{className:"h-4 w-4 text-muted-foreground"}),(0,r.jsx)("div",{className:"text-foreground",children:"Session (Cookie)"})]}),(0,r.jsx)("p",{className:"mt-4 text-sm text-muted-foreground italic",children:"* 一经匹配高优先级认证（无论验证成功或失败），将不再尝试后续认证方式。"})]}),(0,r.jsxs)(eO,{title:"5. 架构优势：底层统一与平滑迁移",children:[(0,r.jsx)(eq,{children:"虽然 API 在访问层进行了物理隔离，但底层的业务逻辑完全共享："}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-4",children:[(0,r.jsx)("h4",{className:"mb-2 font-medium text-foreground text-sm",children:"统一 Service 层"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"Private 与 Public Controller 共同调用同一套 Service。这意味着任何业务逻辑的更新会同步生效于两类 API，且将内部 API 转化为公开 API 只需增加路由配置及 DTO 过滤，极大降低了维护成本，确保了行为的高度一致性。"})]})]})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"認証仕様"}),(0,r.jsx)(eq,{children:"Nata プラットフォームは以下の認証方式をサポートしています。認証方式と優先順位のロジックは kintone REST API 標準を参考にしています。"}),(0,r.jsx)(eO,{title:"1. 認証方式",children:(0,r.jsx)(eL,{headers:["方式","有効なヘッダー (Header)","使用場面"],rows:[["API Token 認証","Authorization: Bearer <TOKEN>","外部システム統合、自動化スクリプト、サードパーティサービス"],["Session 認証 (Cookie)","Cookie: access_token=... および X-Requested-With: XMLHttpRequest","公式クライアント (PC/Mobile/MP)、内部 JS SDK スクリプト"]]})}),(0,r.jsxs)(eO,{title:"2. API タイプとサポート状況",children:[(0,r.jsx)(eq,{children:"ユースケースに基づいて、API の認証サポートを階層化しています："}),(0,r.jsx)(eL,{headers:["API タイプ","パスプレフィックス","サポートする認証方式"],rows:[["Private API (非公開)","/api/*","Session (Cookie) のみ"],["Public API (公開)","/api/v1/*","API Token または Session (Cookie)"]]}),(0,r.jsxs)("ul",{className:"mb-4 space-y-6",children:[(0,r.jsxs)("li",{className:"flex items-start gap-2 text-muted-foreground",children:[(0,r.jsx)(ew,{className:"mt-1 h-4 w-4 shrink-0 text-primary"}),(0,r.jsxs)("span",{children:[(0,r.jsx)("strong",{className:"text-foreground",children:"Private API："}),"公式クライアント（PC、モバイル、ミニアプリなど）専用であり、ユーザーログイン後の Session 認証のみをサポートします。"]})]}),(0,r.jsxs)("li",{className:"flex flex-col gap-3",children:[(0,r.jsxs)("div",{className:"flex items-start gap-2 text-muted-foreground",children:[(0,r.jsx)(ew,{className:"mt-1 h-4 w-4 shrink-0 text-primary"}),(0,r.jsxs)("span",{children:[(0,r.jsx)("strong",{className:"text-foreground",children:"Public API："}),"多様なシナリオに対応するため、混合認証を採用しています。**外部システムは主に API Token (Bearer Token)** を使用して連携しますが、**内部 JS SDK や公式クライアント**は、コンテキストに応じて Session (Cookie) または API Token を柔軟に選択できます。公式クライアントであっても、公開 API を呼び出す際に Token メカニズムを利用して特定の Session 制限を回避することが可能です。"]})]}),(0,r.jsx)(eH,{lang:"ja"})]})]}),(0,r.jsx)("div",{className:"mt-4 rounded-md border border-warning/30 bg-warning/10 p-4",children:(0,r.jsxs)("div",{className:"mb-2 flex items-center gap-2 font-medium text-warning text-sm",children:[(0,r.jsx)(eI,{className:"h-4 w-4"}),"セキュリティ上の注意：Public API で Session 認証を使用する場合、CSRF 防御のために X-Requested-With ヘッダーが必須です。"]})})]}),(0,r.jsxs)(eO,{title:"3. API 分類と位置づけ",children:[(0,r.jsx)(eq,{children:"開発効率とシステムの安定性のバランスをとるため、API を 2 つのカテゴリに分類しています。"}),(0,r.jsx)(eL,{headers:["次元","Private API (非公開)","Public API (公開)"],rows:[["主な対象","公式クライアント (PC/Mobile/MP)","外部連携、内部 SDK"],["安定性","頻繁に変更される可能性あり","互換性を極めて重視"],["バージョン管理","明確な管理なし","厳格なバージョン化 (/v1/...)"],["レート制限","通常制限なし","厳格な制限 (過負荷防止)"]]})]}),(0,r.jsxs)(eO,{title:"4. 認証の優先順位",children:[(0,r.jsx)(eq,{children:"リクエストに複数の認証情報が含まれている場合、サーバーは以下の優先順位で検証を行います："}),(0,r.jsxs)("div",{className:"flex items-center gap-4 py-4 px-6 bg-muted/30 rounded-md border border-border",children:[(0,r.jsx)("div",{className:"font-semibold text-primary",children:"API Token"}),(0,r.jsx)(ey,{className:"h-4 w-4 text-muted-foreground"}),(0,r.jsx)("div",{className:"text-foreground",children:"Session (Cookie)"})]}),(0,r.jsx)("p",{className:"mt-4 text-sm text-muted-foreground italic",children:"* 高い優先順位の認証が一致した場合（検証の成功・失敗に関わらず）、後続の認証方式は試行されません。"})]}),(0,r.jsxs)(eO,{title:"5. アーキテクチャの利点：統一されたコアとスムーズな移行",children:[(0,r.jsx)(eq,{children:"API アクセス層は物理的に分離されていますが、基礎となるビジネスロジックは完全に共有されています："}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-4",children:[(0,r.jsx)("h4",{className:"mb-2 font-medium text-foreground text-sm",children:"統一された Service 層"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"Private と Public の両コントローラーは、同じ Service セットを呼び出します。これにより、ビジネスロジックの更新は両方の API に同時に反映されます。内部 API を公開 API に変換するには、新しいルートの追加と DTO フィルタリングのみが必要であり、メンテナンスコストを大幅に削減しながら、高度な動作の一貫性を保証します。"})]})]})]})}function eQ({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"NestJS 实现规范"}),(0,r.jsx)(eO,{title:"Controller 结构",children:(0,r.jsx)(eR,{title:"records.controller.ts",children:`@ApiTags('Records')
@ApiBearerAuth('JWT-auth')
@Controller('apps/:appId/records')
@UseGuards(UnifiedAuthGuard, ScopeGuard)  // 认证 + Scope 检查
@UseInterceptors(AppAccessInterceptor)    // 应用访问检查
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  // 查询接口 - 可公开或需要读权限
  @Get()
  @Public()  // 或 @RequireScope('records:read')
  @ApiParam({ name: 'appId', description: '应用 ID' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAll(
    @Param('appId') appId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.recordsService.findAll(appId, {
      limit: limit ? parseInt(limit, 10) : 15,
      offset: offset ? parseInt(offset, 10) : 0,
    });
  }

  // 写入接口 - 需要认证和权限
  @Post()
  @RequireScope('records:create')
  async create(
    @Param('appId') appId: string,
    @Body() dto: CreateRecordDto,
    @CurrentActor() actor: Actor,
  ) {
    return this.recordsService.create(appId, dto, actor);
  }
}`})}),(0,r.jsx)(eO,{title:"DTO 定义规范",children:(0,r.jsx)(eR,{title:"dto/records.dto.ts",children:`import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// 创建记录 DTO
const createRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).default({}),
});
export class CreateRecordDto extends createZodDto(createRecordSchema) {}

// 更新记录 DTO
const updateRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).optional(),
});
export class UpdateRecordDto extends createZodDto(updateRecordSchema) {}

// 搜索 DTO
const searchRecordsSchema = z.object({
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'contains', 'in']),
    value: z.unknown(),
  })),
  limit: z.number().int().positive().optional().default(15),
  offset: z.number().int().nonnegative().optional().default(0),
});
export class SearchRecordsDto extends createZodDto(searchRecordsSchema) {}`})}),(0,r.jsx)(eO,{title:"装饰器使用",children:(0,r.jsx)(eR,{title:"装饰器示例",children:`// @Public() - 标记公开访问的端点
@Get()
@Public()
async findAll() { }

// @RequireScope() - 声明需要的权限
@Post()
@RequireScope('records:create')
async create() { }

// @CurrentActor() - 注入当前调用者身份
@Post()
async create(@CurrentActor() actor: Actor) { }

// 多个 scope (需要全部满足)
@Delete()
@RequireScope('records:delete', 'admin:records')
async remove() { }`})}),(0,r.jsx)(eO,{title:"目录结构推荐",children:(0,r.jsx)(eR,{title:"src/api/ 目录结构",children:`src/api/
├── private/          # 内部接口 (Controller 路由不带 private, 如 'apps')
│   ├── apps/
│   │   ├── apps.controller.ts
│   │   ├── apps.service.ts
│   │   └── dto/
│   └── users/
└── public/          # 外部接口 (Controller 路由带版本, 如 'v1/records')
    └── v1/            # 版本隔离
        └── records/   # 对应资源
            ├── records.controller.ts
            ├── records.service.ts
            └── dto/   # DTO 必须独立定义，严禁复用内部 DTO`})})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"NestJS実装仕様"}),(0,r.jsx)(eO,{title:"Controller構造",children:(0,r.jsx)(eR,{title:"records.controller.ts",children:`@ApiTags('Records')
@ApiBearerAuth('JWT-auth')
@Controller('apps/:appId/records')
@UseGuards(UnifiedAuthGuard, ScopeGuard)  // 認証 + Scopeチェック
@UseInterceptors(AppAccessInterceptor)    // アプリアクセスチェック
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  // クエリインターフェース - 公開または読み取り権限が必要
  @Get()
  @Public()  // または @RequireScope('records:read')
  @ApiParam({ name: 'appId', description: 'アプリ ID' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAll(
    @Param('appId') appId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.recordsService.findAll(appId, {
      limit: limit ? parseInt(limit, 10) : 15,
      offset: offset ? parseInt(offset, 10) : 0,
    });
  }

  // 書き込みインターフェース - 認証と権限が必要
  @Post()
  @RequireScope('records:create')
  async create(
    @Param('appId') appId: string,
    @Body() dto: CreateRecordDto,
    @CurrentActor() actor: Actor,
  ) {
    return this.recordsService.create(appId, dto, actor);
  }
}`})}),(0,r.jsx)(eO,{title:"DTO定義仕様",children:(0,r.jsx)(eR,{title:"dto/records.dto.ts",children:`import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// レコード作成 DTO
const createRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).default({}),
});
export class CreateRecordDto extends createZodDto(createRecordSchema) {}

// レコード更新 DTO
const updateRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).optional(),
});
export class UpdateRecordDto extends createZodDto(updateRecordSchema) {}

// 検索 DTO
const searchRecordsSchema = z.object({
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'contains', 'in']),
    value: z.unknown(),
  })),
  limit: z.number().int().positive().optional().default(15),
  offset: z.number().int().nonnegative().optional().default(0),
});
export class SearchRecordsDto extends createZodDto(searchRecordsSchema) {}`})}),(0,r.jsx)(eO,{title:"デコレーター使用",children:(0,r.jsx)(eR,{title:"デコレーター例",children:`// @Public() - 公開アクセスエンドポイントをマーク
@Get()
@Public()
async findAll() { }

// @RequireScope() - 必要な権限を宣言
@Post()
@RequireScope('records:create')
async create() { }

// @CurrentActor() - 現在の呼び出し元IDを注入
@Post()
async create(@CurrentActor() actor: Actor) { }

// 複数scope (すべて満たす必要あり)
@Delete()
@RequireScope('records:delete', 'admin:records')
async remove() { }`})}),(0,r.jsx)(eO,{title:"ディレクトリ構造推奨",children:(0,r.jsx)(eR,{title:"src/api/ ディレクトリ構造",children:`src/api/
├── private/          # 内部インターフェース (Controllerルートにinternalなし, 例: 'apps')
│   ├── apps/
│   │   ├── apps.controller.ts
│   │   ├── apps.service.ts
│   │   └── dto/
│   └── users/
└── public/          # 外部インターフェース (Controllerルートにバージョンあり, 例: 'v1/records')
    └── v1/            # バージョン分離
        └── records/   # 対応リソース
            ├── records.controller.ts
            ├── records.service.ts
            └── dto/   # DTOは独立定義必須、内部DTOの再利用禁止`})})]})}function e$({lang:e}){return"zh"===e?(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"最佳实践"}),(0,r.jsx)(eO,{title:"DO (推荐做法)",children:(0,r.jsx)(eR,{children:`// 使用复数名词
GET /api/apps
GET /api/apps/:appId/records

// 资源嵌套表达层级
GET /api/apps/:appId/records/:recordId

// 查询参数用于过滤
GET /api/apps/:appId/records?status=done&limit=20

// POST 用于复杂查询
POST /api/apps/:appId/records/search

// 统一错误格式
{ "statusCode": 400, "message": "...", "error": "Bad Request" }

// 分页信息包含在响应中
{ "data": [...], "pagination": { "total": 100, "limit": 20 } }`})}),(0,r.jsx)(eO,{title:"DON'T (避免做法)",children:(0,r.jsx)(eR,{children:`// URL 中使用动词
GET /api/getApps
POST /api/apps/:appId/createRecord

// 资源 ID 放在查询参数
GET /api/records?appId=123

// 嵌套过深 (超过 3 层)
GET /api/orgs/:orgId/workspaces/:wsId/apps/:appId/records/:recordId/comments/:commentId

// 混用命名风格
GET /api/apps/:app_id/records/:recordId  // 混用下划线和驼峰`})}),(0,r.jsx)(eO,{title:"版本管理规则",children:(0,r.jsxs)("div",{className:"grid gap-4 md:grid-cols-2",children:[(0,r.jsxs)("div",{className:"rounded-md border border-success/30 bg-success/10 p-4",children:[(0,r.jsxs)("h4",{className:"mb-3 flex items-center gap-2 font-medium text-success",children:[(0,r.jsx)(eP,{className:"h-4 w-4"}),"向后兼容的变更"]}),(0,r.jsx)(eU,{items:["新增可选字段","新增新端点","新增新的查询参数 (可选)","扩展枚举值"]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-destructive/30 bg-destructive/10 p-4",children:[(0,r.jsxs)("h4",{className:"mb-3 flex items-center gap-2 font-medium text-destructive",children:[(0,r.jsx)(eN,{className:"h-4 w-4"}),"破坏性变更 (需要新版本)"]}),(0,r.jsx)(eU,{items:["删除字段","重命名字段","修改字段类型","修改端点路径","修改必填性","删除枚举值"]})]})]})}),(0,r.jsx)(eO,{title:"公开 API 设计特别规范",children:(0,r.jsx)(eU,{items:["必须显式版本化：URL 必须包含版本号 /api/v1/apps/...","严格的分页与限流：必须强制分页，禁止全量返回。默认 limit=20，最大 limit=100","DTO 必须独立定义：严禁复用内部的 DTO，保持精简和稳定","即使是微小的改动，如果可能影响客户代码，也尽量通过新增字段而非修改字段类型来实现"]})}),(0,r.jsx)(eO,{title:"废弃流程",children:(0,r.jsxs)("div",{className:"rounded-md border border-border bg-muted/30 p-4",children:[(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground",children:"1"}),(0,r.jsx)("div",{className:"h-12 w-px bg-border"})]}),(0,r.jsxs)("div",{className:"pb-8",children:[(0,r.jsx)("h4",{className:"font-medium text-foreground",children:"标记废弃 (deprecated)"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"在 Swagger 文档中标记，返回 Warning 响应头，通知使用方"})]})]}),(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground",children:"2"}),(0,r.jsx)("div",{className:"h-12 w-px bg-border"})]}),(0,r.jsxs)("div",{className:"pb-8",children:[(0,r.jsx)("h4",{className:"font-medium text-foreground",children:"过渡期 (至少 6 个月)"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"保持旧版本可用，提供迁移指南，监控使用情况"})]})]}),(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsx)("div",{className:"flex flex-col items-center",children:(0,r.jsx)("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground",children:"3"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{className:"font-medium text-foreground",children:"移除"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"确认无调用后移除，返回 410 Gone"})]})]})]})})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)(eG,{children:"ベストプラクティス"}),(0,r.jsx)(eO,{title:"DO (推奨する方法)",children:(0,r.jsx)(eR,{children:`// 複数形名詞を使用
GET /api/apps
GET /api/apps/:appId/records

// リソースネストで階層を表現
GET /api/apps/:appId/records/:recordId

// クエリパラメータでフィルタリング
GET /api/apps/:appId/records?status=done&limit=20

// 複雑なクエリにはPOSTを使用
POST /api/apps/:appId/records/search

// 統一エラー形式
{ "statusCode": 400, "message": "...", "error": "Bad Request" }

// ページネーション情報をレスポンスに含める
{ "data": [...], "pagination": { "total": 100, "limit": 20 } }`})}),(0,r.jsx)(eO,{title:"DON'T (避けるべき方法)",children:(0,r.jsx)(eR,{children:`// URLに動詞を使用
GET /api/getApps
POST /api/apps/:appId/createRecord

// リソースIDをクエリパラメータに
GET /api/records?appId=123

// 深すぎるネスト (3層超)
GET /api/orgs/:orgId/workspaces/:wsId/apps/:appId/records/:recordId/comments/:commentId

// 命名スタイルの混在
GET /api/apps/:app_id/records/:recordId  // アンダースコアとキャメルケースの混在`})}),(0,r.jsx)(eO,{title:"バージョン管理ルール",children:(0,r.jsxs)("div",{className:"grid gap-4 md:grid-cols-2",children:[(0,r.jsxs)("div",{className:"rounded-md border border-success/30 bg-success/10 p-4",children:[(0,r.jsxs)("h4",{className:"mb-3 flex items-center gap-2 font-medium text-success",children:[(0,r.jsx)(eP,{className:"h-4 w-4"}),"後方互換性のある変更"]}),(0,r.jsx)(eU,{items:["オプショナルフィールドの追加","新規エンドポイントの追加","新規クエリパラメータの追加 (オプショナル)","列挙値の拡張"]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-destructive/30 bg-destructive/10 p-4",children:[(0,r.jsxs)("h4",{className:"mb-3 flex items-center gap-2 font-medium text-destructive",children:[(0,r.jsx)(eN,{className:"h-4 w-4"}),"破壊的変更 (新バージョンが必要)"]}),(0,r.jsx)(eU,{items:["フィールドの削除","フィールドの名前変更","フィールド型の変更","エンドポイントパスの変更","必須性の変更","列挙値の削除"]})]})]})}),(0,r.jsx)(eO,{title:"外部API設計特別仕様",children:(0,r.jsx)(eU,{items:["明示的バージョン化必須：URLにバージョン番号を含める /api/v1/apps/...","厳格なページネーションとレート制限：必須ページネーション、全量返却禁止。デフォルト limit=20、最大 limit=100","DTO独立定義必須：内部DTOの再利用禁止、簡潔さと安定性を維持","軽微な変更でも顧客コードに影響する可能性がある場合、フィールド型の変更ではなく新規フィールド追加で対応"]})}),(0,r.jsx)(eO,{title:"廃止プロセス",children:(0,r.jsxs)("div",{className:"rounded-md border border-border bg-muted/30 p-4",children:[(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground",children:"1"}),(0,r.jsx)("div",{className:"h-12 w-px bg-border"})]}),(0,r.jsxs)("div",{className:"pb-8",children:[(0,r.jsx)("h4",{className:"font-medium text-foreground",children:"廃止マーク (deprecated)"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"Swaggerドキュメントでマーク、Warningレスポンスヘッダーを返す、利用者に通知"})]})]}),(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground",children:"2"}),(0,r.jsx)("div",{className:"h-12 w-px bg-border"})]}),(0,r.jsxs)("div",{className:"pb-8",children:[(0,r.jsx)("h4",{className:"font-medium text-foreground",children:"移行期間 (最低6ヶ月)"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"旧バージョンを維持、移行ガイドを提供、使用状況を監視"})]})]}),(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsx)("div",{className:"flex flex-col items-center",children:(0,r.jsx)("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground",children:"3"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{className:"font-medium text-foreground",children:"削除"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"呼び出しがないことを確認後削除、410 Goneを返す"})]})]})]})})]})}e.s(["default",()=>eD],31713)}]);