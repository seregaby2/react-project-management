import { useNavigate } from 'react-router-dom';
import { SwitchLocalization } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { isLoggedSlice } from '../../store/reducers/isLoggedSlice';

interface INavList {
  handleisOpenMenu?: () => void;
}

export const NavList = ({ handleisOpenMenu }: INavList) => {
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((state) => state.reducerIsLogged);
  const { setIsLogged } = isLoggedSlice.actions;
  const dispatch = useAppDispatch();

  const handleToCreateNewBoard = () => {
    //navigate('/????????');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  const handleToProfile = () => {
    navigate('/profile');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  const handleSignOut = () => {
    dispatch(setIsLogged(false));
    navigate('/');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  return (
    <ul>
      {isLogged && <li onClick={handleToCreateNewBoard}>Create new board</li>}
      {isLogged && <li onClick={handleToProfile}>Edit profile</li>}
      {isLogged && <li onClick={handleSignOut}>Sign out</li>}
      <li>
        <SwitchLocalization />
      </li>
    </ul>
  );
};
