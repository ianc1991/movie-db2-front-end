import Card from './Card/Card';
import './reccomendedRectangle.css';

const ReccomendedRectangle = (props) => {
  return (
    <div className='reccomendedRectangleContainer'>
        <h3 className='rectangleTitle'>{props.title}</h3>
        <div className='innerRectangle'>
            <Card 
                moviesArray = {props.movies}
            />
        </div>
    </div>
  )
}

export default ReccomendedRectangle