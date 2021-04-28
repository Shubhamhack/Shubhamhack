var imgs = [
      'https://1.bp.blogspot.com/-rMEdBNXbJtY/YIlq1gTwYqI/AAAAAAAAK8Q/SVoULXPeXAonZVXU6LqYr1zm3x08zXMTwCNcBGAsYHQ/s1333/Screenshot_2021-04-28-19-31-05-79.jpg',
      'https://1.bp.blogspot.com/-l2OzY3qr7lQ/YIlq5tV-ikI/AAAAAAAAK8U/Ij5T3UO9VMoYf8-aegCEZ-Sk3XG9OwuwQCNcBGAsYHQ/s2400/Screenshot_2021-04-28-19-30-42-71.jpg',
      'https://1.bp.blogspot.com/-KyolXV6Bn1g/YIlq8OAX6FI/AAAAAAAAK8Y/FlnZ5ErSyzgUj-xqdGsLeaQCy6VltlrMACNcBGAsYHQ/s2400/Screenshot_2021-04-28-19-29-00-23.jpg',
      'https://1.bp.blogspot.com/-WjYrE4ipx4o/YIlq90oH4AI/AAAAAAAAK8c/WSXifk2TXNAgUKvvWjcI86j43Q3ZRU9CwCNcBGAsYHQ/s2400/Screenshot_2021-04-28-19-28-31-41.jpg',
      'https://1.bp.blogspot.com/-B68et1jkiuc/YIlrAOb8yUI/AAAAAAAAK8g/EukVZ--SI8oHqenJ8Zl0rA4_tFU8dUSpwCNcBGAsYHQ/s2400/Screenshot_2021-04-28-19-27-57-81.jpg'
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