import { configureStore } from '@reduxjs/toolkit'
import userInfo from '../slice/UserSession/userSession'
import menuState from '../slice/MenuSlice/MenuState'
import formState from '../slice/FormSlice/FormSlice'
import formType from '../slice/FormType/FormType'
import themeMode from '../slice/ThemeMode/ThemeMode'
import pageState from '../slice/PageSlice/PageSlice'
import employeeSelect from '../slice/FormSelectedRow/EmployeeSelected'

export const store = configureStore({
  reducer: {
    user: userInfo,
    isOpen: menuState,
    isOpenForm: formState,
    formType: formType,
    selectedTheme: themeMode,
    selectedPage: pageState,
    employeeSelected: employeeSelect,
  },
})