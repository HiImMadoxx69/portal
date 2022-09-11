import { configureStore } from '@reduxjs/toolkit'
import userInfo from '../slice/UserSession/userSession'
import menuState from '../slice/MenuSlice/MenuState'
import formState from '../slice/FormSlice/FormSlice'
import formType from '../slice/FormType/FormType'

export const store = configureStore({
  reducer: {
    user: userInfo,
    isOpen: menuState,
    isOpenForm: formState,
    formType: formType,
  },
})