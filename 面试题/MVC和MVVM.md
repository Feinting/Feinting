## MVC

MVC 是一种使用 MVC（Model View Controller 模型-视图-控制器）设计创建 Web 应用程序的模式：
Model（模型）: 应用程序中用于处理应用程序数据逻辑的部分。
View（视图）: 显示效果（HTML页面）。
Controller（控制器）: 是应用程序中处理用户交互的部分。通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

MVC将应用抽象为数据层（Model）、视图层（View）、逻辑层（controller），降低了项目耦合。但MVC并未限制数据流，Model和View之间可以通信。

## MVVM

它抽离了视图、数据和逻辑，并限定了Model和View只能通过VM进行通信，VM订阅Model并在数据更新时候自动同步到视图。
