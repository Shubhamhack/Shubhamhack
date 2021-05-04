var imgs = [
      'https://1.bp.blogspot.com/-brg3N134q3k/YJFhiRsVrkI/AAAAAAAALD8/KYZKopX8kRU2qGAZzoRZq32LaSOIwJUkwCNcBGAsYHQ/s1331/IMG-20210504-WA0023.jpg',
      'https://1.bp.blogspot.com/-hMwlLBmdHb4/YJFhiSI_lxI/AAAAAAAALD4/fMHkyB-inHUIqlLZaM8xsYJ8feOFdPj5gCNcBGAsYHQ/s1280/IMG-20210504-WA0024.jpg',
      'https://1.bp.blogspot.com/-RkTPPWV1w1M/YJFhqDG1iHI/AAAAAAAALEI/KDDbQrJU0q0XxNQuowk1sT7_KsYqku0LgCNcBGAsYHQ/s1280/IMG-20210409-WA0104.jpg',
      'https://1.bp.blogspot.com/-UiN3_jgeKwE/YJFhjQj7YLI/AAAAAAAALEE/47Upu2zsGR8VLJTqNgDLUe0_oU_YYNf-wCNcBGAsYHQ/s1280/IMG-20210504-WA0026.jpg',
      'https://1.bp.blogspot.com/-MgO61QcTe1s/YJFhiTDy7BI/AAAAAAAALEA/t_Kc77ALE54lUrdQelDkD4cZz17lPZuVgCNcBGAsYHQ/s1280/IMG-20210504-WA0025.jpg'
    ],
    n = imgs.length,
    current = n-1,
    closedWidth = Math.floor(window.innerWidth/10)


for (var i=0; i<n; i++){
  
  var bgImg = document.createElement('div');
  bg.appendChild(bgImg);
  
  gsap.set(bgImg, {
    attr:{id:'bgImg'+i, class:'bgImg'},
    width:'100%',
    height:'100%',
    backgroundImage:'url('+imgs[i]+')',
    backgroundSize:'cover',
    backgroundPosition:'center'
  })
  
  var b = document.createElement('div');
  fg.appendChild(b);
  
  gsap.fromTo(b, {
    attr:{id:'b'+i, class:'box'},
    innerHTML:'<p><sub>Fig.</sub> '+(i+1)+'</p>',
    width:'100%',
    height:'100%',
    borderLeft:(i>0)?'solid 1px #eee':'',
    backgroundColor:'rgba(250,250,250,0)',
    left:i*closedWidth,
    transformOrigin:'100% 100%',
    x:'100%'
  },{
    duration:i*0.15,
    x:0,
    ease:'expo.inOut'
  })  
  
  b.onmouseenter = b.onclick = (e)=>{    
    if (Number(e.currentTarget.id.substr(1))==current) return;
     
    var staggerOrder = !!(current < Number(e.currentTarget.id.substr(1)));
    current = Number(e.currentTarget.id.substr(1));
    gsap.to('.box', {
      duration:0.5,
      ease:'elastic.out(0.3)',
      left:(i)=>(i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth),
      x:0,
      stagger: staggerOrder? 0.05:-0.05
    })
    
    bg.appendChild( document.getElementById('bgImg'+current) )
    gsap.fromTo('#bgImg'+current, {opacity:0}, {opacity:1, duration:0.3, ease:'power1.inOut'})
    gsap.fromTo('#bgImg'+current, {scale:1.05, rotation:0.05}, {scale:1, rotation:0, duration:1.5, ease:'sine'}) 
  }
}


window.onresize = (e)=>{
  closedWidth = Math.floor(window.innerWidth/10)
  gsap.set('.box', { x:0, left:(i)=> (i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth) })
}