import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = ({ history }) =>
{
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("hey")
    }, [pathname]);

    return null;
}
