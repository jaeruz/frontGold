import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as VscIcons from 'react-icons/vsc';


export const SideBarDataAdmin = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <RiIcons.RiDashboardLine />,
        class_name: 'nav-text',
    },
    {
        title: 'Items',
        path: '/',
        icon: <GiIcons.GiGloves />,
        class_name: 'nav-text',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Add Item',
                path: '/items/add',
                icon: <FaIcons.FaPlus />
            },
            {
                title: 'Option 2',
                path: '/items/option2',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'User Accounts',
        path: '/',
        icon: <FaIcons.FaUsers />,
        class_name: 'nav-text',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Admins',
                path: '/users/admins',
                icon: <FaIcons.FaUserTie />
            },
            {
                title: 'Staffs',
                path: '/users/staffs',
                icon: <FaIcons.FaUserInjured />
            }
        ]
    },
]

export const SideBarDataStaff = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        class_name: 'nav-text',
    },
    {
        title: 'Process',
        path: '/',
        icon: <VscIcons.VscGear />,
        class_name: 'nav-text',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'ISR',
                path: '/process/isr',
                icon: <FaIcons.FaPrint />
            },
            {
                title: 'Barcode Scan',
                path: '/process/scan',
                icon: <FaIcons.FaBarcode />
            }
        ]
    },
    {
        title: 'Logs',
        path: '/',
        icon: <FaIcons.FaBook />,
        class_name: 'nav-text',
    },
]