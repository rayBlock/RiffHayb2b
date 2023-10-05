
import { AbsoluteFill,  useCurrentFrame,  interpolate, Easing,  } from 'remotion'; 

export const BannerQuer: React.FC <{Texter:string}> = ({Texter}) => {
   
    // const {width, height} = useVideoConfig();
    const frame = useCurrentFrame();
    const Mover = interpolate(frame, [45,60],[-1200,-40],
       {extrapolateRight: 'clamp', extrapolateLeft:'clamp'})
       const MoverY = interpolate(frame, [45,60],[-500,20], 
        {extrapolateRight: 'clamp', extrapolateLeft:'clamp',
       easing:  Easing.bezier(0.8, 0.22, 0.96, 0.65),}
        )
    
    const Opac = interpolate(frame, [55,60],[0,1])
    
    
    const vanish = interpolate(frame, [90,150],[0,-200]  , {extrapolateLeft:'clamp', extrapolateRight: 'clamp', easing: Easing.ease})
    // val - = von unten 
    // val + = von Oben
    // console.log(vanish, "vanish val")
    
    
    const blurr = interpolate(frame, [100,150],[0,40] , {extrapolateLeft:'clamp', extrapolateRight: 'clamp', easing: Easing.ease})
    
    return (
    <AbsoluteFill
    style={{
    
    justifyContent: 'center', 
    alignItems: 'center', 
    }}>
    
    
    <svg 
    style={{zIndex: 0,
      transform: `translateY(${MoverY}px) translateX(${Mover}px)`, opacity: `${Opac}`}}
    width="720" 
    height="1280" 
    role="none" y="50%" x="50%">
    
    
    <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(95)">
          <stop offset="5%"  stopColor="blue" />
          <stop offset="95%" stopColor="black" />
        </linearGradient>
      </defs>
    
    <filter id="filtr">
    <feGaussianBlur stdDeviation="12"/>
    <feOffset dx="6" dy={vanish} result="offsetblur"/>
    <feFlood floodOpacity="1" floodColor="#000000"/>
    <feComposite in2="offsetblur" in="SourceGraphic"operator="in"/>
    
    </filter>
    
    
    
     <polygon style={{
          transformBox: 'fill-box',
          transformOrigin: 'center' ,     
        
         }} 
        filter='url(#filtr)'  
          strokeWidth="3"  
          stroke="white"  
          fill="url('#myGradient')" 
          // x="50%"
          // y="50%"
          points="660 200, 5 320, 5 480, 660 360"
          
          />
    
    
    <text x='30px' y='415' fill='white'
    style={{zIndex: '2', color: 'white', transform: `rotate(-10deg)`, fontSize:'70px', filter:`blur(${blurr}px)`}}>
    
    {Texter}
    
    </text>
    </svg>
    {/* <Banner style={{transform: `translateX(${Mover}px) translate(0px) skew(-20deg, 0deg)` }}>
      Guitar
    </Banner>
     */}
    
    
    
    </AbsoluteFill>
    )}