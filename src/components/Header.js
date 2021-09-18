import "./Header.css";
import { FaTwitter, FaDiscord } from 'react-icons/fa';

const Header = () => {
    return (
        <header className='flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
                {/* <img className='rounded-full w-12' src='/ms-icon-310x310.png' alt='XOLOS logo'/> */}
                <span className='uppercase font-semibold text-lg ml-4'>XOLOS</span>
            </div>
            <div className='flex flex-row'>
                <a href='https://twitter.com' rel="noreferrer" target='_blank' className='mr-6'>
                    <FaTwitter size={24} color='#000000'/>
                </a>
                <a href='https://discord.gg/hK9jDZHe' rel="noreferrer" target='_blank'>
                    <FaDiscord size={24} color='#000000'/>
                </a>
            </div>
        </header>
    );
};

export default Header;