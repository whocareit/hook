# hook学习
## hook介绍
## 使用State Hook
## 使用Effect Hook
1. 副作用：
* 不需要清除的： 在React更新DOM之后运行一些额外的代码：如：发送网络请求，手动变更DOM，记录日志等
* 需要清除的：当使用外部数据源时，需要去清除数据
2. useEffect渲染时机：在默认情况喜爱，会在第一次渲染之后和每次更新渲染之后都会去执行
3. useEffect作用：告诉组件在渲染之后执行某些操作。
4. useEffect放在组件内部调用的原因：可以在effect中直接访问state中的变量
5. effect返回函数：effect可选的清除机制，每个effect都可以返回一个清除函数
6. react何时清除effect：react在组件卸载时执行清除操作
## hook规则
hook需要遵循的两条规则：
1. 只在最顶层使用hook
* 注意：不要在循环，条件和嵌套函数中调用hook
2. 只在react函数中调用hook(不在普通的js函数中调用hook)
* 在react的组件中调用hook
* 在自定义的hook中调用其他hook
### ESLint插件
1. eslint-plugin-react-hooks的ESlint插件来强制执行上面所说的这两种规则
2. react怎样知道state对应的是哪个useState
* React靠的是Hook调用的顺序，在hook中调用顺序在每次渲染中都是相同的，如果放在条件语句等，其执行顺序就会不一样，从而导致报错
## 自定义hook
* 作用：可以将组建逻辑提取到可以重用的函数中
### 提取自定义hook
当两个函数之间共享逻辑时，会将其提取到第三个函数中，而组件和hook都是函数
* 自定义hook是一个函数，其名称以use开头，函数内部可以调用其他的hook
* 自定义hook必须以“use”开头？
1. 必须如此，如果不遵循这个约定，就无法判断某个函数是否包含对其内部hook的调用，react将无法自动检查hook是否违反了hook的规则
* 在两个组件中使用相同的hook会共享state？
1. 不会，自定义hook是一种重用状态逻辑的机制，所以每次使用自定义hook时，其所有的state和副作用是完全隔离的
### 多个hook之间共享传递信息
## Hook API
### 基础hook
* useState
返回一个state，以及更新state的函数
1. 函数式更新：新的state需要通过使用先前的state计算得出，将函数传递给setState,该函数将接收先前的state，并返回一个更新后的值
* useEffect
1. 接收内容：一个包含命令式、并且可能有副作用代码的函数
2. 清除effect：实现方式，effect函数需要返回一个清除函数
3. effect执行时机：在浏览器完成布局和绘制之后，传给useEffect的函数会延迟调用，因此不应该在函数中执行足赛浏览器更新屏幕的操作。
4. 默认条件执行：会在每轮组件渲染完成后执行，因而一旦effect的依赖发生变化，他就会被重新创建。要改变其执行时机，需要给useEffect传递第二个参数，只有当第二个参数值发生改变才会重新创建订阅。
注意： 如果要使用这个优化的方式，需要确保数组包含了所有外部作用域中会发发生变化，且在effect中使用的变量。如果只想运行一次effect，可以传递一个空数组作为第二个参数。
* useContext
1. 用法： const value = useContext(MyContext);
2. 描述：接收一个Context对象，并返回该context的当前值。当前的context值由上层组件中距离当前组件最近的
<MyContext.Provider>的value.prop决定
### 额外的hook
* useReducer
* useCallback
* useMemo
* useRef
* useImperativeHandle
* useLayoutEffect
1. 更新时机：在浏览器执行下一次绘制前去执行
* useDebugValue


