export type InlineKeyboardButton = {
  text: string
  url?: string
  style?: string
  callback_data?: string
  web_app?: { url: string }
  login_url?: {
    url: string
    forward_text?: string
    bot_username?: string
    request_write_access?: boolean
  }
  switch_inline_query?: string
  switch_inline_query_current_chat?: string
  switch_inline_query_chosen_chat?: {
    query?: string
    allow_user_chats?: boolean
    allow_bot_chats?: boolean
    allow_group_chats?: boolean
    allow_channel_chats?: boolean
  }
  copy_text?: { text: string }
}
