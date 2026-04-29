import HeroSection from './HeroSection'
import SearchCard from './SearchCard'
import AppPromotion from './AppPromotion'
import Features from './Features'
import HowItWorks from './HowItWorks'
import SendMessage from './SendMessage'

const HomeView = () => {
  return (
    <div>
      <HeroSection />
      <div className='bg-gray-50'>
        <SearchCard />
        <AppPromotion />
        <Features />
        <HowItWorks/>
        <SendMessage/>
       
       
      </div>
    </div>
  )
}

export default HomeView