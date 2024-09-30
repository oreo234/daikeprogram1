import { defineStore } from 'pinia'
import { MenuThemeType } from '@/types/store'
import { ThemeList, ElementPlusTheme, DarkMenuStyles } from '@/config/setting'
import { SystemThemeEnum, MenuThemeEnum } from '@/enums/appEnum'
import { colourBlend } from '@/utils/utils'
import { getSysStorage } from '@/utils/storage'

export interface SettingState {
  systemThemeType: SystemThemeEnum // 全局主题类型 light dark
  systemThemeMode: SystemThemeEnum // 全局主题模式 light dark auto
  menuThemeType: MenuThemeEnum // 菜单主题类型
  systemThemeColor: string // 系统主题颜色
  boxBorderMode: boolean // 盒子模式 border | shadow
  uniqueOpened: boolean // 是否开启手风琴模式
  showMenuButton: boolean // 是否显示菜单展开按钮
  showRefreshButton: boolean // 是否显示页面刷新按钮
  showCrumbs: boolean // 是否显示全局面包屑
  autoClose: boolean // 设置后是否自动关闭窗口
  showWorkTab: boolean // 是否显示多标签
  showLanguage: boolean // 是否显示多语言选择
  showNprogress: boolean // 是否显示顶部进度条
  colorWeak: boolean // 是否显示顶部进度条
  showSettingGuide: boolean // 是否显示设置引导
  pageTransition: string // 页面切换动画
  menuOpen: boolean // 菜单是否展开
  refresh: boolean
}

export const useSettingStore = defineStore({
  id: 'settingStore',
  state: (): SettingState => ({
    systemThemeType: SystemThemeEnum.LIGHT,
    systemThemeMode: SystemThemeEnum.LIGHT,
    menuThemeType: MenuThemeEnum.DESIGN,
    boxBorderMode: false,
    uniqueOpened: true,
    systemThemeColor: ElementPlusTheme.primary,
    showMenuButton: true,
    showRefreshButton: true,
    showCrumbs: true,
    autoClose: false,
    showWorkTab: true,
    showLanguage: true,
    showNprogress: false,
    colorWeak: false,
    showSettingGuide: true,
    pageTransition: 'slide-right',
    menuOpen: true,
    refresh: false
  }),
  getters: {
    getMenuTheme(): MenuThemeType {
      const list = ThemeList.filter((item) => item.theme === this.menuThemeType)
      if (this.isDark) {
        return DarkMenuStyles[0]
      } else {
        return list[0]
      }
    },
    // 是否为暗黑模式
    isDark(): boolean {
      return this.systemThemeType === SystemThemeEnum.DARK
    }
  },
  actions: {
    // 初始化state
    initState() {
      let sys = getSysStorage()

      if (sys) {
        sys = JSON.parse(sys)
        const { setting } = sys.user

        this.systemThemeType = setting.systemThemeType || SystemThemeEnum.LIGHT
        this.systemThemeMode = setting.systemThemeMode || SystemThemeEnum.LIGHT
        this.menuThemeType = setting.menuThemeType || MenuThemeEnum.DESIGN
        this.systemThemeColor = setting.systemThemeColor || ElementPlusTheme.primary
        this.boxBorderMode = setting.boxBorderMode
        this.uniqueOpened = setting.uniqueOpened
        this.showMenuButton = setting.showMenuButton
        this.showRefreshButton = setting.showRefreshButton
        this.showCrumbs = setting.showCrumbs
        this.autoClose = setting.autoClose
        this.showWorkTab = setting.showWorkTab
        this.showLanguage = setting.showLanguage
        this.showNprogress = setting.showNprogress
        this.colorWeak = setting.colorWeak
        this.showSettingGuide = setting.showSettingGuide
        this.pageTransition = setting.pageTransition
        this.menuOpen = setting.menuOpen

        setElementThemeColor(setting.systemThemeColor)
      } else {
        setElementThemeColor(ElementPlusTheme.primary)
      }
    },
    setGlopTheme(theme: SystemThemeEnum, themeMode: SystemThemeEnum) {
      this.systemThemeType = theme
      this.systemThemeMode = themeMode
    },
    setMenuTheme(theme: MenuThemeEnum) {
      this.menuThemeType = theme
    },
    setElementTheme(theme: string) {
      // theme = theme.split(',')[2].replace(')', '')
      this.systemThemeColor = theme
      setElementThemeColor(theme)
    },
    // 设置盒子模式
    setBorderMode() {
      this.boxBorderMode = !this.boxBorderMode
    },
    // 设置菜单是否为手风琴模式
    setUniqueOpened() {
      this.uniqueOpened = !this.uniqueOpened
    },
    // 显示侧边栏折叠按钮
    setButton() {
      this.showMenuButton = !this.showMenuButton
    },
    // 是否自动关闭个性化设置
    setAutoClose() {
      this.autoClose = !this.autoClose
    },
    // 是否显示页面刷新按钮
    setShowRefreshButton() {
      this.showRefreshButton = !this.showRefreshButton
    },
    // 是否显示面包屑导航
    setCrumbs() {
      this.showCrumbs = !this.showCrumbs
    },
    // 是否显示多标签
    setWorkTab(show: boolean) {
      this.showWorkTab = show
    },
    // 是否显示多语言选择
    setLanguage() {
      this.showLanguage = !this.showLanguage
    },
    // 是否显示顶部进度条
    setNprogress() {
      this.showNprogress = !this.showNprogress
    },
    //  色弱模式
    setColorWeak() {
      this.colorWeak = !this.colorWeak
    },
    // 隐藏设置引导
    hideSettingGuide() {
      this.showSettingGuide = false
    },
    // 显示设置引导
    openSettingGuide() {
      this.showSettingGuide = true
    },
    // 设置页面切换动画
    setPageTransition(transition: string) {
      this.pageTransition = transition
    },
    // 设置菜单是否展开
    setMenuOpen(open: boolean) {
      this.menuOpen = open
    },
    // 刷新当前页
    reload() {
      this.refresh = !this.refresh
    }
  }
})

function setElementThemeColor(color: string) {
  const mixColor = '#ffffff'
  const elStyle = document.documentElement.style
  // bStyle.getPropertyValue('--el-color-primary')

  elStyle.setProperty('--el-color-primary', color)
  elStyle.setProperty('--van-primary-color', color)

  // 设置系统字体颜色跟随系统主色
  // elStyle.setProperty('--art-body-color', color)
  // elStyle.setProperty('--art-text-gray-800', color)

  for (let i = 1; i < 10; i++) {
    const itemColor = colourBlend(color, mixColor, i / 10)
    elStyle.setProperty(`--el-color-primary-light-${i}`, itemColor)
    elStyle.setProperty(`--el-color-primary-dark-${i}`, itemColor)
  }

  // 生成更淡一点的颜色
  for (let i = 1; i < 16; i++) {
    const itemColor = colourBlend(color, mixColor, i / 16)
    elStyle.setProperty(`--el-color-primary-custom-${i}`, itemColor)
  }

  // 重写按钮颜色
  // for (let i = 1; i < 9; i++) {
  //   let elSuccessColor = '#2dce89'
  //   let elInfoColor = '#11cdef'
  //   let elWarningColor = '#fb6340'
  //   let elDangerColor = '#f5365c'

  //   let successColor = colourBlend(elSuccessColor, mixColor, i / 9)
  //   elStyle.setProperty(`--el-color-success-dark-${i}`, successColor)
  //   elStyle.setProperty(`--el-color-success-light-${i}`, successColor)

  //   let infoColor = colourBlend(elInfoColor, mixColor, i / 9)
  //   elStyle.setProperty(`--el-color-info-dark-${i}`, infoColor)
  //   elStyle.setProperty(`--el-color-info-light-${i}`, infoColor)

  //   let warningColor = colourBlend(elWarningColor, mixColor, i / 9)
  //   elStyle.setProperty(`--el-color-warning-dark-${i}`, warningColor)
  //   elStyle.setProperty(`--el-color-warning-light-${i}`, warningColor)

  //   let dangerColor = colourBlend(elDangerColor, mixColor, i / 9)
  //   elStyle.setProperty(`--el-color-danger-dark-${i}`, dangerColor)
  //   elStyle.setProperty(`--el-color-danger-light-${i}`, dangerColor)
  // }
}