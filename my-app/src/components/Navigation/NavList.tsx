import { useNavigate } from 'react-router-dom';
import { SwitchLocalization } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SingupSlice } from '../../store/reducers/authSlice';

interface INavList {
  handleisOpenMenu?: () => void;
}

export const NavList = ({ handleisOpenMenu }: INavList) => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.reducerSingupRequest);
  const { checkAuthUser } = SingupSlice.actions;
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
    dispatch(checkAuthUser(false));
    navigate('/');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  return (
    <ul>
      {isAuth && <li onClick={handleToCreateNewBoard}>Create new board</li>}
      {isAuth && <li onClick={handleToProfile}>Edit profile</li>}
      {isAuth && <li onClick={handleSignOut}>Sign out</li>}
      <li>
        <SwitchLocalization />
      </li>
    </ul>
  );
};
