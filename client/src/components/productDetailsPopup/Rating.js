import ReactStars from 'react-rating-stars-component';


const Rating = ( { rating }) => {

   const options = {
      edit : false ,
      color: 'rgba(25,25,25,0.9)',
      activeColor: 'var(--primary)' ,
      size : window.innerWidth < 600 ? 20 : 25,
      value : rating  ,
      isHalf : true ,
   }
   return (
      <ReactStars {...options} />
   )
}

export default Rating