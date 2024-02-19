'use client'
import './style.css';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';

/*import { useRouter } from 'next/navigation';*/

type Data = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}

function Frontpage() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [frontpage, setFrontpage] = useState(null) as [Data[] | null, (frontpage: Data[] | null) => void]

    const get = (name: string) => {
        // Check if frontpage is not null and not empty
        if (frontpage && frontpage.length > 0) {
          const filteredContent = frontpage.filter(item => item.name === name);
          // Check if any matching content was found
          if (filteredContent.length > 0) {
            return filteredContent[0].value as string;
          } else {
            return ""; // Return an empty string if no matching content found
          }
        } else {
          return ""; // Return an empty string if frontpage is empty or null
        }
      };

    useEffect(() => {
        const fetchFrontpage = async () => {
            const { data, error } = await supabase
            .from('frontpage') //fetching data from this table in Supabase
            .select()

            if(error) {
                setFetchError('Could not fetch Where')
                setFrontpage(null)
                console.log(error)
            }
            if (data) {
                setFrontpage(data)
                setFetchError("")
            }
        }

        fetchFrontpage();
    }, [])

    //Fetching data from Supabase - end

    console.log(frontpage)
    if(fetchError) return <p>{fetchError}</p>

    return(
        <div>
            <Navbar/>
            <div className='imgandtext'>
                <img className='main-img' src='/setrid2.jpg' alt='stethoscope' />
            </div>

            <div className='phoneclockcontainer'>

            <div className='iconbtn1'> 
                <img className='icon2' src='/emailicon.png' alt='email icon' />
                <h2 className='undericon'>Tölvupóstur</h2>
                {error && <p>{error}</p>}
                    <div>
                        <p className='info-btn2'>{get('email')}</p>
                    </div>
            </div>

            <div className='iconbtn'>
                    <img className='icon2' src='/clockicon.png' alt='clock icon' />
                    <h2 className='undericon'>Opnunartímar</h2>
                    {error && <p>{error}</p>}
                    <p className='info-btn2'>{get('oh Monday')}</p>
                    <p className='info-btn2'>{get('oh Friday')}</p>
                </div>

                <div className='iconbtn1'>
                    <img className='icon2' src='/phoneicon.png' alt='phone'/>
                    <h2 className='undericon'>Símanúmer</h2>
                        {error && <p>{error}</p>}
                        <div>
                            <p className='info-btn2'>{get('Phone number')}</p>
                        </div>
                </div>
            </div>
            

        <h2>Velkomin í Læknasetrið</h2>
        <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum.</p>
        
        
        <div className='midsectioncontainer'>
            <div className='midsectionbtn'>
                <div className='textandbtn'>
                <img className='icon' src='/doctorsicon.png' alt='doctor icon' />
                    <p>Sjáðu alla lækna og annað starfsfólk sem starfar 
                    í Læknasetrinu</p>
                    <Link href='/laeknar'>
                        <button>Læknar</button>
                    </Link>
                </div>
            </div>

                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon3' src='/ecgicon.png' alt='doctor icon' />
                        <p>Lestu um allar þær rannsóknir sem gerðar
                        eru í Læknasetrinu</p>
                        <Link href='/frontpageadmin'>
                            <button>Rannsóknir</button>
                        </Link>
                    </div>
                </div>
            </div>

        {error && <p>{error}</p>}
 
            <h2>{get('title')}</h2>
            
        <div className='where'>
            <div className='where1'>
                {error && <p>{error}</p>}

                    <div className='instructions'>
                        <p className='where-p'>{get('left text')}</p>
                    </div>

            {error && <p>{error}</p>}
            <img src={get('left image')} className='where-img'></img>
            </div>

            <div className='where1'>
                {error && <p>{error}</p>}

                <div className='instructions1'>
                    <p className='where-p'>{get('right text')}</p>
                </div>

                <iframe
                    className='where-img1'
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.1994490448126!2d${get('longitude')}!3d${get('latitude')}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d6736832b01681%3A0xad9986d263da471d!2zTMOma25hc2V0cmnDsA!5e0!3m2!1sen!2sis!4v1699990097702!5m2!1sen!2sis`}
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    frameBorder={0}
                    >
                </iframe>

            </div>
        </div>
        <Footer/>

        </div>
    );
            }

    export default Frontpage;

    /*{error && <p>{error}</p>}

            <div className='oh-container'>
                <h2 className='oh-h2'>Opnunartímar</h2>
                <p className='where-p'>Mánudagar {get('oh Monday')}</p>
                <p className='where-p'>Þriðjudagar {get('oh Tuesday')}</p>
                <p className='where-p'>Miðvikudagar {get('oh Wednesday')}</p>
                <p className='where-p'>Fimmtudagar {get('oh Thursday')}</p>
                <p className='where-p'>Föstudagar {get('oh Friday')}</p>
            </div>*/



/*import './style.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

function Covid() {
    return (
      <>
      <Navbar/>
      <h1 className='h1'>Covid-19</h1>
      <div className='covid-container'>
        <img className='main-img2' src='/covid.avif' alt='person stopping covid virus' />
        <div className='small-covid-container'>
            <p className='covid-p'>Sértu í hættu á Covid-19 smiti, með flensueinkenni eða illa kvefaður, ertu vinsamlegast 
            beðinn um hafa samband og fresta bókuðum tíma, eða skoða möguleika á að fá símtal eða fjarlækningaviðtal í staðinn.
            s. 535-7700 eða á setrid@setrid.is</p>
        </div>
        <h2 className='covid-h2'>Áhættuhópar</h2>
        <p className='covid-p'>Gefnar hafa verið út leiðbeiningar frá sóttvarnarlækni til sjúklinga í áhættuhóp sem finna má á covid.is - áhættuhópar</p>

        <h2 className='covid-h2'>Leiðbeiningar frá læknum:</h2>

        <h2 className='covid2-h2'>COVID-19 og hjarta og æðasjúkdómar</h2>
        <p className='covid-p'>Sýking með SARS-COV-2 veirunni veldur COVID-19 sjúkdómi. Sjúkdómurinn veldur vanalega dæmigerðum einkennum 
        veirusýkinga það er að segja hita, hósta, slappleika og beinverkjum. Einkennin eru allt frá því að vera mjög væg upp í að vera 
        lífshættuleg með alvarlegum öndunarerfiðleikum og líffærabilun en slík versnun getur komið fram nokkrum dögum eftir að veikindanna 
        verður fyrst vart. Langflestir fá tiltölulega væg einkenni en lítill hluti sjúklinga veikist alvarlega.<br/><br/>

        Fólk með undirliggjandi hjarta og æðasjúkdóma, háþrýsting og sykursýki er í aukinni hættu á alvarlegum veikindum og sama gildir um 
        þá sem eldri eru. Ónæmiskerfi yngra fólks virðist vera betur í stakk búið til að takast á viðsýkinguna.<br/><br/>

        Reykingafólk og þeir sem hafa lungasjúkdóma er einnig í aukinni áhættu, enda leggst sýkingin í alvarlegum tilfellum fyrst og fremst 
        á lungun. Fólk er því eindregið hvatt til að hætta reykingum.<br/><br/>

        Ástæður þess að sjúklingar með hjartasjúkdóma, háþrýsting og sykursýki eru í aukinni hættu á að fá alvarleg einkenni hafa ekki verið 
        skýrðar að fullu en ónæmiskerfið virðist spila þar inní. Covid-19 sjúkdómurinn getur einnig aukið talsvert álagið á hjarta og æðakerfi 
        og þeir sem hafa undirliggjandi kransæðasjúkdóm til dæmis geta verið mun viðkvæmari fyrir falli í súrefnismettun.</p>

        <h3 className='covid-h3'>Hvað er hægt að gera til að koma í veg fyrir sýkingu? </h3>
        <p className='covid-p'>Embætti Landlæknis gaf út ítarlegar leiðbeiningar 7. mars 2020 sem gott er að lesa.<br/><br/> 
        Það er mikilvægt að forðast sýkingu með öllum ráðum og fara enn varlegar en aðrir. Forðast fjölmenna staði og allt samneyti við þá sem hafa 
        einhver einkenni sýkingar, þótt afar væg séu. Allir ﬂurfa að þvo hendur oft og vel og á réttan hátt (börn eiga að hafa fengið góða þjálfun 
        í handþvotti) og fólki er ráðlagt að forðast að snerta andlitið. Sótthreinsa yfirborð sem maður snertir oft; ekki deila með öðrum mat, 
        gleraugum, handklæðum, áhöldum o.s.frv. og hósta í olnbogabótina eða í klút. Það getur verið skynsamlegt að fá aðstoð við innkaup eða heimsend matvæli.</p>

        <h3 className='covid-h3'>Ef þú ert með hjarta eða æðasjúkdóm ættir þú að:</h3>
            <ul>
                <li><p className='covid-p'>Passa að hreyfa þig á hverjum degi. Ef veður leyfir og þú treystir þér til ættir þú að ganga úti. Einnig má 
                nýta sér leikfimi í útvarpi eða sjónvarpi og leiðbeiningar sem hægt er að nálgast á netinu.</p></li>
                <li><p className='covid-p'>Athugaðu að þú eigir lyf sem duga næstu 4 vikurnar og passaðu að taka lyfin samkvæmt fyrirmælum.</p></li>
                <li><p className='covid-p'>Ef þú ert ekki þegar bólusett(ur) fyrir lungnabólgu af völdum pneumokokka bakteríu og influensu leitaðu þá til þinnar heilsugæslu.</p></li>
                <li><p className='covid-p'>Ef þú færð einkenni (hita, hósta) skaltu gæta fyllstu varkárni til að smita ekki aðra. Vertu með rafrænan aðgang að Heilsuveru 
                og hafðu samband í netspjalli við hjúkrunarfæðing. Við alvarlegri einkenni, háan hita eða öndunarfæraerfiðleika er mikilvægt að þú hafir samband við þinn 
                lækni eða lækni á Heilsugæslu. Vaktsíminn 1700 er opinn allan sólarhringinn.</p></li>
                <li><p className='covid-p'>Þú ættir að fylgjast sérstaklega vel með þinni líðan ef þú smitast af covid-19. Einkenni geta versnað skyndilega! Hafðu alltaf 
                samnband við lækni við öndunarerfiðleika, aukna mæði og/eða mæði í hvíld.</p></li>
                <li><p className='covid-p'>Taktu parasetamól (panodil) við hita og verkjum. Ekki taka bólgueyðandi verkjalyf (íbúfen, naproxen, celekoxib og fleiri).</p></li>
                <li><p className='covid-p'>Sýking af hvaða tagi sem er eykur vökvaþörf þína, passaðu að drekka nóg.</p></li>
                <li><p className='covid-p'>Sjúklingar með hjartabilun sem eru á þvagræsandi lyfjum (furix, torasemide) ættu að fylgjast daglega með vikt. Aukin mæði 
                samhliða þyngdaraukningu getur verið merki um vökvasöfnun í lungum en slíkt getur þó verið erfitt að greina frá lungnabólgu og nauðsynlegt að leita ráða læknis.</p></li>
                <li><p className='covid-p'>Ef þú ert á töflumeðferð við sykursýki ættir þú að fá leiðbeiningar hjá lækni hvort þú þurfir að stöðva eða breyta skömmtum af 
                sykursýkitöflunum þínum (þetta á t.d. við um jardiance, forxiga, glimeryl og metformin). Stungulyfi sem ekki eru insúlín (victoza og ozempic) valda ekki 
                hættu á sykurfalli og má öllu jöfnu taka áfram.</p></li>
                <li><p className='covid-p'>Sérstakar leiðbeiningar gilda fyrir þá sem eru á insúlíni en þeim sjúklingum er bent á að vera í sambandi við sinn lækni eða göngudeild sykursjúkra.</p></li>
                <li><p className='covid-p'>En umfram allt vertu í góðu sambandi við fjölskyldu og vini og farðu vel með þig á þessum erfiðu tímum.</p> </li>
            </ul>
        <p className='goodluck-p'>Gangi þér vel</p>
        </div>
        <p className='author-p'>22. mars 2020<br/><br/>Helga Margrét Skúladóttir hjartalæknir</p>
      <Footer/>
      </>
    );
}

export default Covid; */