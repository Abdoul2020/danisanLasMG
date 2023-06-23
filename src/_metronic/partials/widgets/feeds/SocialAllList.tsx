import React, { useState,useEffect } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

interface DropdownComponentProps {
  options: string[];
  handleData:any
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ options, handleData   }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [searchValue, setSearchValue] = useState('');
  const [hoveredOption, setHoveredOption] = useState('');
  

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey !== null) {
      setSelectedOption(selectedKey);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption('');
  };

  const handleSearchInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(searchValue.toLowerCase())
  );

 


  // the option to remain
  const getOptionIcon = (option: string) => {
    const socialMediaOptions: Record<string, {icon: JSX.Element, url: string}> = {

      "Facebook": {
        icon: <i className="fab fa-facebook facebook-icon"></i>,
        url: "https://www.facebook.com"
      },
      "Instagram": {
        icon: <i className="fab fa-instagram instagram-icon"></i>,
        url: "https://www.instagram.com"
      },
      "Twitter": {
        icon: <i className="fab fa-twitter twitter-icon"></i>,
        url: "https://www.twitter.com"
      },
      "WhatsApp": {
        icon: <i className="fab fa-whatsapp whatsapp-icon"></i>,
        url: "https://www.whatsapp.com"
      },
      "YouTube": {
        icon: <i className="fab fa-youtube youtube-icon"></i>,
        url: "https://www.youtube.com"
      },
      "Pinterest": {
        icon: <i className="fab fa-pinterest pinterest-icon"></i>,
        url: "https://www.pinterest.com"
      },
      "Tumblr": {
        icon: <i className="fab fa-tumblr tumblr-icon"></i>,
        url: "https://www.tumblr.com"
      },
      "Reddit": {
        icon: <i className="fab fa-reddit reddit-icon"></i>,
        url: "https://www.reddit.com"
      },
      "Vimeo": {
        icon: <i className="fab fa-vimeo vimeo-icon"></i>,
        url: "https://www.vimeo.com"
      },
      "Slack": {
        icon: <i className="fab fa-slack slack-icon"></i>,
        url: "https://www.slack.com"
      },
      "Dribbble": {
        icon: <i className="fab fa-dribbble dribbble-icon"></i>,
        url: "https://www.dribbble.com"
      },
      "Github": {
        icon: <i className="fab fa-github github-icon"></i>,
        url: "https://www.github.com"
      },
      "SoundCloud": {
        icon: <i className="fab fa-soundcloud soundcloud-icon"></i>,
        url: "https://www.soundcloud.com"
      },
      "Medium": {
        icon: <i className="fab fa-medium medium-icon"></i>,
        url: "https://www.medium.com"
      },
      "Twitch": {
        icon: <i className="fab fa-twitch twitch-icon"></i>,
        url: "https://www.twitch.tv"
      },
      "Flickr": {
        icon: <i className="fab fa-flickr flickr-icon"></i>,
        url: "https://www.flickr.com"
      },
      "Yelp": {
        icon: <i className="fab fa-yelp yelp-icon"></i>,
        url: "https://www.yelp.com"
      },
      "Spotify": {
        icon: <i className="fab fa-spotify spotify-icon"></i>,
        url: "https://www.spotify.com"
      },
      "SlideShare": {
        icon: <i className="fab fa-slideshare slideshare-icon"></i>,
        url: "https://www.slideshare.net"
      },
      "VKontakte": {
        icon: <i className="fab fa-vk vk-icon"></i>,
        url: "https://www.vk.com"
      },
      "Xing": {
        icon: <i className="fab fa-xing xing-icon"></i>,
        url: "https://www.xing.com"
      },
      "Weibo": {
        icon: <i className="fab fa-weibo weibo-icon"></i>,
        url: "https://www.weibo.com"
      },
      "TripAdvisor": {
        icon: <i className="fab fa-tripadvisor tripadvisor-icon"></i>,
        url: "https://www.tripadvisor.com"
      },
      // I'm adding a generic icon for the rest of the options since there may not be a corresponding Font Awesome icon for them.
      "Blogger": {
        icon: <i className="fas fa-globe globe-icon"></i>,
        url: "https://www.blogger.com"
      },
      "TikTok": {
        icon: <i className="fas fa-globe globe-icon"></i>,
        url: "https://www.tiktok.com"
      },
      "Telegram": {
        icon: <i className="fas fa-globe globe-icon"></i>,
        url: "https://telegram.org"
      },
      // ... Continue this pattern for the rest of the options.

      "Meetup": {
        icon: <i className="fas fa-globe globe-icon"></i>,
        url: "https://www.meetup.com"
      },
      "Quora": {
        icon: <i className="fab fa-quora quora-icon"></i>,
        url: "https://www.quora.com"
      },
      "MySpace": {
        icon: <i className="fab fa-myspace myspace-icon"></i>,
        url: "https://myspace.com"
      },
      "Gmail": {
        icon: <i className="fas fa-envelope gmail-icon"></i>,
        url: "https://mail.google.com"
      },
      "Skype": {
        icon: <i className="fab fa-skype skype-icon"></i>,
        url: "https://www.skype.com"
      },
      "Zoom": {
        icon: <i className="fas fa-video zoom-icon"></i>,
        url: "https://zoom.us"
      },
      "WordPress": {
        icon: <i className="fab fa-wordpress wordpress-icon"></i>,
        url: "https://wordpress.org"
      },
      "StumbleUpon": {
        icon: <i className="fab fa-stumbleupon stumbleupon-icon"></i>,
        url: "http://www.stumbleupon.com"
      },
      "Messenger": {
        icon: <i className="fab fa-facebook-messenger messenger-icon"></i>,
        url: "https://www.messenger.com"
      },
      "Zillow": {
        icon: <i className="fas fa-home zillow-icon"></i>,
        url: "https://www.zillow.com"
      },
      "AngelList": {
        icon: <i className="fab fa-angellist angellist-icon"></i>,
        url: "https://angel.co"
      },
      // ... Continue this pattern for the rest of the options.

      "Last.fm": {
        icon: <i className="fab fa-lastfm lastfm-icon"></i>,
        url: "https://www.last.fm/"
      },
      "Foursquare": {
        icon: <i className="fab fa-foursquare foursquare-icon"></i>,
        url: "https://foursquare.com/"
      },
      "DeviantArt": {
        icon: <i className="fab fa-deviantart deviantart-icon"></i>,
        url: "https://www.deviantart.com/"
      },
      "Houzz": {
        icon: <i className="fab fa-houzz houzz-icon"></i>,
        url: "https://www.houzz.com/"
      },
      "Behance": {
        icon: <i className="fab fa-behance behance-icon"></i>,
        url: "https://www.behance.net/"
      },
      "Snapchat": {
        icon: <i className="fab fa-snapchat snapchat-icon"></i>,
        url: "https://www.snapchat.com/"
      },

    };
  
    const optionData = socialMediaOptions[option];
    if (!optionData) {
      return { icon: null, url: null };
    }
    return optionData;
  };

  const { icon, url } = getOptionIcon(selectedOption);
  console.log("Selected option:", selectedOption, "Icon:", icon, "URL:", url);

  useEffect(() => {

    console.log("OkwellSaid::",selectedOption )
    
    handleData({
      icon:icon,
      url:url
    })
    
      }, [selectedOption])


  



  return (
    <Dropdown onSelect={handleSelect}>
    <Dropdown.Toggle
      variant=""
      id="dropdown-custom-components"
      className="form-control-lg form-control-solid mb-3 mb-lg-0 text-start form-control">


      {selectedOption}

    </Dropdown.Toggle>
  
    <Dropdown.Menu style={{ width: "100%", maxHeight: "200px", overflowY: "auto" }}>
      <FormControl
        autoFocus
        className=""
        placeholder="Ara..."
        value={searchValue}
        onChange={handleInputChange}
        onClick={handleSearchInputClick}
      />
  
  {filteredOptions.length > 0 ? (
  filteredOptions.map((option) => {
    const { icon, url } = getOptionIcon(option);
    return (
      <Dropdown.Item
        key={option}
        eventKey={option}
        className={`${selectedOption === option ? 'active' : ''} ${hoveredOption === option ? 'hovered' : ''
          }`}
        onClick={() => setSelectedOption(option)}
        onMouseEnter={() => handleMouseEnter(option)}
        onMouseLeave={handleMouseLeave}
      >
        {option} &nbsp;
        {hoveredOption === option && icon && <a href={url}>{icon}</a>} {/* Check if icon is not null before rendering */}
      </Dropdown.Item>
    )
  })
) : (
  <Dropdown.Item disabled> Bulunamadı </Dropdown.Item>
)}




    </Dropdown.Menu>
  </Dropdown>
  

  );
};

export default DropdownComponent;
