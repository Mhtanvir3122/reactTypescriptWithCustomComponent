type DrawerFooterProps = {
  children: JSX.Element | JSX.Element[] | string
}

const DrawerFooter = ({children}: DrawerFooterProps) => {
  return (
		<div
			className="drawer-footer bg-white  p-1"
		>
			{children}
		</div>
	);
}

export default DrawerFooter
