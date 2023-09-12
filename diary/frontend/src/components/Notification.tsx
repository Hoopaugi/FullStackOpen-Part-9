interface NotificationProps {
  notification: string
}

const Notification = (props: NotificationProps) => {
  const notification = props.notification

  if (notification === '') {
    return null
  }

  return (
    <>
      <p>{notification}</p>
    </>
  )
}

export default Notification
