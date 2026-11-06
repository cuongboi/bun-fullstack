import { create } from "zustand"
import { persist } from "zustand/middleware"

const en = {
  "common.add": "Add",
  "common.cancel": "Cancel",
  "error.crashed": "Something went wrong.",
  "error.reload": "Reload",
  "table.search": "Search…",
  "table.clearSearch": "Clear search",
  "table.view": "View",
  "table.toggleColumns": "Toggle columns",
  "table.rowsPerPage": "Rows per page",
  "table.page": "Page {page} of {count}",
  "table.firstPage": "Go to first page",
  "table.previousPage": "Go to previous page",
  "table.nextPage": "Go to next page",
  "table.lastPage": "Go to last page",
  "table.sortBy": "Sort by {title}",
  "table.resizeColumn": "Resize column {title}",
  "table.actions": "Actions",
  "table.selectAll": "Select all",
  "table.selectRow": "Select row",
  "table.emptyTitle": "No results",
  "table.emptyDescription": "There is nothing to show here yet.",
  "table.export": "Export",
  "table.exportCsv": "Export as CSV",
  "table.exportXlsx": "Export as Excel",
  "table.exportFailed": "Export failed",
  "upload.upload": "Upload image",
  "upload.change": "Change image",
  "upload.remove": "Remove image",
  "upload.uploading": "Uploading…",
  "upload.dropHere": "Drop your images here",
  "upload.hint": "PNG, JPG, WebP or GIF (max. {maxSize})",
  "upload.select": "Select images",
  "upload.addMore": "Add more",
  "upload.count": "Images ({count})",
  "upload.tooMany": "You can upload at most {max} images.",
  "upload.tooLarge": "{name} is larger than {maxSize}.",
  "upload.invalidType": "{name} is not a supported image type.",
  "upload.unauthorized": "Sign in to upload images.",
  "upload.rateLimited": "Too many uploads. Try again in a minute.",
  "upload.network": "Network error. Check your connection and try again.",
  "upload.failed": "Could not upload {name}.",
  "nav.platform": "Platform",
  "nav.dashboard": "Dashboard",
  "nav.files": "Files",
  "nav.settings": "Settings",
  "nav.signOut": "Sign out",
  "dashboard.empty": "Nothing here yet.",
  "notFound.title": "Page not found",
  "notFound.description": "The page you are looking for does not exist.",
  "notFound.back": "Back to dashboard",
  "auth.signIn": "Sign in",
  "auth.signUp": "Sign up",
  "auth.createAccount": "Create an account",
  "auth.name": "Name",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.haveAccount": "Have an account? Sign in",
  "auth.newHere": "New here? Create an account",
  "auth.failed": "Something went wrong",
  "files.upload": "Upload a file",
  "files.delete": "Delete",
  "files.apiDocs": "API docs",
  "settings.title": "Settings",
  "settings.description": "Manage your profile and preferences.",
  "settings.profile": "Profile",
  "settings.appearance": "Appearance",
  "settings.language": "Language",
  "settings.avatar": "Avatar",
  "settings.name": "Name",
  "settings.nameRequired": "Enter your name",
  "settings.email": "Email",
  "settings.save": "Save changes",
  "settings.saved": "Profile updated",
  "settings.saveFailed": "Could not update your profile",
  "settings.themeHint": "Choose how the app looks on this device.",
  "settings.themeLight": "Light",
  "settings.themeDark": "Dark",
  "settings.themeSystem": "System",
  "settings.languageHint": "Choose the language of the app on this device.",
} as const

export type TKey = keyof typeof en
export type TFunction = (
  key: TKey,
  params?: Record<string, string | number>
) => string

const vi: Record<TKey, string> = {
  "common.add": "Thêm",
  "common.cancel": "Hủy",
  "error.crashed": "Đã xảy ra lỗi.",
  "error.reload": "Tải lại",
  "table.search": "Tìm kiếm…",
  "table.clearSearch": "Xóa tìm kiếm",
  "table.view": "Hiển thị",
  "table.toggleColumns": "Ẩn/hiện cột",
  "table.rowsPerPage": "Số dòng mỗi trang",
  "table.page": "Trang {page} / {count}",
  "table.firstPage": "Đến trang đầu",
  "table.previousPage": "Đến trang trước",
  "table.nextPage": "Đến trang sau",
  "table.lastPage": "Đến trang cuối",
  "table.sortBy": "Sắp xếp theo {title}",
  "table.resizeColumn": "Đổi kích thước cột {title}",
  "table.actions": "Thao tác",
  "table.selectAll": "Chọn tất cả",
  "table.selectRow": "Chọn dòng",
  "table.emptyTitle": "Không có kết quả",
  "table.emptyDescription": "Chưa có dữ liệu để hiển thị.",
  "table.export": "Xuất",
  "table.exportCsv": "Xuất CSV",
  "table.exportXlsx": "Xuất Excel",
  "table.exportFailed": "Xuất thất bại",
  "upload.upload": "Tải ảnh lên",
  "upload.change": "Đổi ảnh",
  "upload.remove": "Xóa ảnh",
  "upload.uploading": "Đang tải lên…",
  "upload.dropHere": "Thả ảnh vào đây",
  "upload.hint": "PNG, JPG, WebP hoặc GIF (tối đa {maxSize})",
  "upload.select": "Chọn ảnh",
  "upload.addMore": "Thêm ảnh",
  "upload.count": "Ảnh ({count})",
  "upload.tooMany": "Chỉ được tải lên tối đa {max} ảnh.",
  "upload.tooLarge": "{name} lớn hơn {maxSize}.",
  "upload.invalidType": "{name} không phải định dạng ảnh được hỗ trợ.",
  "upload.unauthorized": "Hãy đăng nhập để tải ảnh lên.",
  "upload.rateLimited": "Tải lên quá nhiều. Hãy thử lại sau một phút.",
  "upload.network": "Lỗi mạng. Hãy kiểm tra kết nối và thử lại.",
  "upload.failed": "Không thể tải lên {name}.",
  "nav.platform": "Nền tảng",
  "nav.dashboard": "Bảng điều khiển",
  "nav.files": "Tệp",
  "nav.settings": "Cài đặt",
  "nav.signOut": "Đăng xuất",
  "dashboard.empty": "Chưa có gì ở đây.",
  "notFound.title": "Không tìm thấy trang",
  "notFound.description": "Trang bạn đang tìm không tồn tại.",
  "notFound.back": "Về bảng điều khiển",
  "auth.signIn": "Đăng nhập",
  "auth.signUp": "Đăng ký",
  "auth.createAccount": "Tạo tài khoản",
  "auth.name": "Tên",
  "auth.email": "Email",
  "auth.password": "Mật khẩu",
  "auth.haveAccount": "Đã có tài khoản? Đăng nhập",
  "auth.newHere": "Chưa có tài khoản? Tạo tài khoản",
  "auth.failed": "Đã xảy ra lỗi",
  "files.upload": "Tải tệp lên",
  "files.delete": "Xóa",
  "files.apiDocs": "Tài liệu API",
  "settings.title": "Cài đặt",
  "settings.description": "Quản lý hồ sơ và tùy chọn của bạn.",
  "settings.profile": "Hồ sơ",
  "settings.appearance": "Giao diện",
  "settings.language": "Ngôn ngữ",
  "settings.avatar": "Ảnh đại diện",
  "settings.name": "Tên",
  "settings.nameRequired": "Hãy nhập tên của bạn",
  "settings.email": "Email",
  "settings.save": "Lưu thay đổi",
  "settings.saved": "Đã cập nhật hồ sơ",
  "settings.saveFailed": "Không thể cập nhật hồ sơ",
  "settings.themeHint": "Chọn giao diện của ứng dụng trên thiết bị này.",
  "settings.themeLight": "Sáng",
  "settings.themeDark": "Tối",
  "settings.themeSystem": "Hệ thống",
  "settings.languageHint": "Chọn ngôn ngữ của ứng dụng trên thiết bị này.",
}

export const LOCALES = [
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
] as const
export type Locale = (typeof LOCALES)[number]["value"]

const translator =
  (dictionary: Record<TKey, string>): TFunction =>
  (key, params) =>
    dictionary[key].replace(/\{(\w+)\}/g, (match, name: string) =>
      String(params?.[name] ?? match)
    )

// One stable function per locale: memoized messages depend on `t` changing with it.
const translators: Record<Locale, TFunction> = {
  en: translator(en),
  vi: translator(vi),
}

export const useLocale = create<{
  locale: Locale
  setLocale: (locale: Locale) => void
}>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "locale" }
  )
)

const syncDocument = (locale: Locale) => {
  document.documentElement.lang = locale
}
syncDocument(useLocale.getState().locale)
useLocale.subscribe((state) => syncDocument(state.locale))

/** For code outside React. Components use `useT`, which re-renders on a locale change. */
export const t: TFunction = (key, params) =>
  translators[useLocale.getState().locale](key, params)

export const useT = () => translators[useLocale((state) => state.locale)]
