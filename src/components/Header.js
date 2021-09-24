import "./Header.css";
import { FaDiscord } from 'react-icons/fa';
import { Button } from "@material-ui/core";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='flex flex-row justify-around'>
            <NavLink exact to='/'>
                <Button variant="text">Home</Button>
            </NavLink>
            <NavLink exact to='/roadmap'>
                <Button variant="text">Roadmap</Button>
            </NavLink>
            <NavLink exact to='/faq'>
                <Button variant="text">FAQ</Button>
            </NavLink>
            
            {/** Change your discord link here */}
            <a href='https://discord.gg/hK9jDZHe' rel="noreferrer" target='_blank'>
                <FaDiscord size={22} color='#ffffff'/>
            </a>
        </header>
    );
};

export default Header;