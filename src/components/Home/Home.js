import Carousel from "./Carousel/Carousel"
import ReccomendedRectangle from "./ReccomendedRectangle/ReccomendedRectangle"

const Home = () => {
    return (
        <div>
            <div class="carouselContainer">
                <Carousel />
            </div>
            <div class="rectangleContainer">
                <ReccomendedRectangle />
            </div>
        </div>
    )
}

export default Home
