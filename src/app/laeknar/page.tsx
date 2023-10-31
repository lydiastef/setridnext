import './style.scss';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

function Laeknar() {
    return (
      <>
      <Navbar/>
      <h1 className='h1'>Læknar/Starfsfólk</h1>
      <div className='image-and-intro'>
        <img className='main-img2' src='/laeknar.avif' alt='two doctors' />
          <p className='intro-p'>Fjöldi lækna starfa hjá Læknasetrinu í hinum ýmsu greinum. Hér fyrir neðan er yfirlit yfir lækna sem starfa hjá Læknasetrinu.</p>
      </div>
          <div className='laeknar-container'>
            <h2 className='laeknar-h2'>Blóðlæknar</h2>
              <div className='cards'>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Brynjar Viðarsson - Blóðlæknir</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Guðmundur Rúnarsson - Blóðlæknir</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/woman.avif' alt='doctor' />
                  <p className='doctors-p'>Sigrún Reykdal - Blóðlæknir</p>
                </div>
              </div>

              <h2 className='laeknar-h2'>Gigtlæknar</h2>
              <div className='cards'>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Árni Jón Geirsson - Gigtlæknir</p>
                </div>
              </div>

              <h2 className='laeknar-h2'>Hjartalæknar</h2>
              <div className='cards'>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Atli Einarsson - hjartasjúkdómar</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Geir Hirlekar</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Daníel Ásgeirsson - lyflækningar, hjarta- og nýrnasjúkdómar</p>
                </div>
              </div>
          </div>
        <Footer/>
      </>
    );
}

export default Laeknar;

  