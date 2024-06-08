import React from 'react'
import { TabBar } from 'react-native-tab-view'


export default function Tabs() {
  return <>
    <TabBar
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: 'white' }}
        activeColor='black'
        inactiveColor='gray'
    />

    <TabBar.Item title="Home" />
    <TabBar.Item title="Profile" />
    <TabBar.Item title="Settings" />

    </>
}
