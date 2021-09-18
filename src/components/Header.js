import "./Header.css";
import { FaDiscord } from 'react-icons/fa';
import { ButtonGroup, Button } from "@material-ui/core";

const Header = () => {
    return (
        <header className='flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
                <a href='/' rel="noreferrer" target='_blank'>
                    <img className='rounded-full w-12' src='/logo.png' alt='NFT logo'/>
                </a>
            </div>
            <ButtonGroup className="text-centered" aria-label="primary button group">
                <a href='/roadmap' rel="noreferrer" target='_blank'>
                    <Button variant="text">Roadmap</Button>
                </a>
                <a href='/faq' rel="noreferrer" target='_blank'>
                    <Button variant="text">FAQ</Button>
                </a>
                <a href='https://discord.gg/hK9jDZHe' rel="noreferrer" target='_blank'>
                    <FaDiscord size={24} color='#ffffff'/>
                </a>
            </ButtonGroup>
        </header>
    );
};

export default Header;