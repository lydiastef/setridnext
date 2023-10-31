import './style.scss';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

function Rannsoknir() {
    return (
      <>
      <Navbar/>
      <h1 className='h1'>Rannsóknir</h1>
      <div className='image-and-intro'>
        <img className='main-img2' src='/rannsoknir.avif' alt='doctor with patient' />
          <p className='intro-p'>Við bjóðum upp á allar helstu rannsóknir innan lyflækninga s.s. hjartalækninga, gigtlækninga, lungnalækninga, meltingarlækninga, nýrnalækninga, ofnæmislækninga,  taugalækninga, innkirtla- og efnaskiptalækninga, blóðlækninga og krabbameinslækninga.</p>
      </div>

      <div className='btn-container'>

        <div className='btn-pair'>
            <div className='individual-btn'>
                <p className='rannsokn-p'>Hjartaómskoðun</p>
            </div>
            <div className='individual-btn'>
                <p className='rannsokn-p'>Áreynslupróf</p>
            </div>
        </div>

        <div className='btn-pair'>
            <div className='individual-btn'>
                <p className='rannsokn-p'>24-klst blóðþrýstingsmælingar</p>
            </div>
            <div className='individual-btn'>
                <p className='rannsokn-p'>24 eða 48 klst Holter (hjartasíriti)</p>
            </div>
        </div>

        <div className='btn-pair'>
            <div className='individual-btn'>
                <p className='rannsokn-p'>Snjallsíma-Holter</p>
            </div>
            <div className='individual-btn'>
                <p className='rannsokn-p'>Lungnarannsóknir - spirometria</p>
            </div>
        </div>
      </div>
      <Footer/>
      </>
    );
}

export default Rannsoknir;