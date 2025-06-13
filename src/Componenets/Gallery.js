import React, { useEffect } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as constants from '@fortawesome/free-solid-svg-icons'
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup/dist/jquery.magnific-popup';

const Gallery = () => {
  useEffect(() => {
    $(".popup-link").magnificPopup({
      type: 'image',
      // other options
    });

    $(".popup-gallery").magnificPopup({
      type: 'image',
      gallery: {
        enabled: true,
      },
      // other options
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });

    $('.magnific-mix-gallery').each(function () {
      var $container = $(this);
      var $imageLinks = $container.find('.item');

      var items = [];
      $imageLinks.each(function () {
        var $item = $(this);
        var type = 'image';
        if ($item.hasClass('magnific-iframe')) {
          type = 'iframe';
        }
        var magItem = {
          src: $item.attr('href'),
          type: type
        };
        magItem.title = $item.data('title');
        items.push(magItem);
      });

      $imageLinks.magnificPopup({
        mainClass: 'mfp-fade',
        items: items,
        gallery: {
          enabled: true,
          tPrev: $(this).data('prev-text'),
          tNext: $(this).data('next-text')
        },
        type: 'image',
        callbacks: {
          beforeOpen: function () {
            var index = $imageLinks.index(this.st.el);
            if (-1 !== index) {
              this.goTo(index);
            }
          }
        }
      });
    });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
<>
<div className="gallery-area default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="site-heading text-center">
                                {/* <h3>Gallery</h3> */}
                                <h2>Our Food Gallery</h2>
                                <p>
                                Welcome to the Food Gallery of parathas & platters, where every bite tells a story of passion and perfection. Immerse yourself in the rich and flavorful world of our expertly designed parathas and platters, all created to enhance your culinary experience
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="gallery-items row">
                        <div className="row">
                            <div className="text-center food-menu-content">
                                <div className="row magnific-mix-gallery text-center masonary">

                                    <div className="pf-item col-md-4">
                                      <div className='card'>
                                      <div className="item-effect">
                                            <img src="assests/img/gallery/gallery1.jpg" alt="Thumb" className='card-img-top' />
                                            <a href="assests/img/gallery/gallery1.jpg" className="item popup-link"><FontAwesomeIcon icon={constants.faPhotoFilm} style={{ color: 'white' }} /></a>
                                        </div>
                                      </div>
                                     
                                    </div>

                                    <div className="pf-item col-md-4">
                                      <div className='card'>
                                      <div className="item-effect">
                                            <img src="assests/img/gallery/gallery2.jpg" alt="Thumb" className='card-img-top' />
                                            <a href="assests/img/gallery/gallery2.jpg" className="item popup-link"><FontAwesomeIcon icon={constants.faPhotoFilm} style={{ color: 'white' }} /></a>
                                        </div>
                                      </div>
                                        
                                    </div>

                                    <div className="pf-item col-md-4">
                                      <div className='card'>
                                      <div className="item-effect">
                                            <img src="assests/img/gallery/gallery3.jpg" alt="Thumb" className='card-img-top' />
                                            <a href="assests/img/gallery/gallery3.jpg" className="item popup-link"><FontAwesomeIcon icon={constants.faPhotoFilm} style={{ color: 'white' }} /></a>
                                        </div>
                                      </div>
                                        
                                    </div>

                                    <div className="pf-item col-md-4">
                                        <div className="item-effect">
                                            <img src="assests/img/gallery/gallery4.jpg" alt="Thumb" className='card-img-top' />
                                            <a href="assests/img/gallery/gallery4.jpg" className="item popup-link"><FontAwesomeIcon icon={constants.faPhotoFilm} style={{ color: 'white' }} /></a>
                                        </div>
                                    </div>

                                    <div className="pf-item col-md-4">
                                        <div className="item-effect">
                                            <img src="assests/img/gallery/gallery5.jpg" alt="Thumb" className='card-img-top' />
                                            <a href="assests/img/gallery/gallery5.jpg" className="item popup-link"><FontAwesomeIcon icon={constants.faPhotoFilm} style={{ color: 'white' }} /></a>
                                        </div>
                                    </div>


                                    <div className="pf-item col-md-4">
                                        <div className="item-effect">
                                            <img src="assests/img/gallery/gallery6.jpg" alt="Thumb" className='card-img-top' />
                                            <a href="assests/img/gallery/gallery6.jpg" className="item popup-link"><FontAwesomeIcon icon={constants.faPhotoFilm} style={{ color: 'white' }} /></a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</>
  )
}

export default Gallery
