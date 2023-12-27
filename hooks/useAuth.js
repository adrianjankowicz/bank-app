import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'

export let useAuth = () => useContext(AuthContext)