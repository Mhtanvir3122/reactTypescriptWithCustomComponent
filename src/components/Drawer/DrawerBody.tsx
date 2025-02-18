type DrawerBodyProps = {
  children: JSX.Element | JSX.Element[] | string
}

const DrawerBody = ({children}: DrawerBodyProps) => {
  return <div className='drawer-body px-6 py-3 p-6 '>{children}</div>
}

export default DrawerBody
