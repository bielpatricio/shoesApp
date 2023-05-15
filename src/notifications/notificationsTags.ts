import OneSignal from 'react-native-onesignal'

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email)
}

export function tagUserDelete() {
  OneSignal.deleteTag('user_email')
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: 'Biel',
    user_email: 'gabrielpatrcio@psoft.com',
  })
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_item_count', itemsCount)
}
