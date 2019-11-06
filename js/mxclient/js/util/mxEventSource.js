/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxEventSource
 *
 * Base class for objects that dispatch named events. To create a subclass that
 * inherits from mxEventSource, the following code is used.
 * 调度命名事件的对象的基类。要创建从MXEventSource继承的子类，请使用以下代码。
 * (code)
 * function MyClass() { };
 *
 * MyClass.prototype = new mxEventSource();
 * MyClass.prototype.constructor = MyClass;
 * (end)
 *
 * Known Subclasses:
 *
 * <mxGraphModel>, <mxGraph>, <mxGraphView>, <mxEditor>, <mxCellOverlay>,
 * <mxToolbar>, <mxWindow>
 * 
 * Constructor: mxEventSource
 *
 * Constructs a new event source.
 */
function mxEventSource(eventSource)
{
	this.setEventSource(eventSource);
};

/**
 * Variable: eventListeners
 *
 * Holds the event names and associated listeners in an array. The array
 * contains the event name followed by the respective listener for each
 * registered listener.
 * 将事件名和关联的侦听器保存在数组中。数组包含事件名，后跟每个已注册侦听器的相应侦听器。
 */
mxEventSource.prototype.eventListeners = null;

/**
 * Variable: eventsEnabled
 *
 * Specifies if events can be fired. Default is true.
 * 指定是否可以激发事件。默认值为true。
 */
mxEventSource.prototype.eventsEnabled = true;

/**
 * Variable: eventSource
 *
 * Optional source for events. Default is null.
 */
mxEventSource.prototype.eventSource = null;

/**
 * Function: isEventsEnabled
 * 
 * Returns <eventsEnabled>.
 */
mxEventSource.prototype.isEventsEnabled = function()
{
	return this.eventsEnabled;
};

/**
 * Function: setEventsEnabled
 * 
 * Sets <eventsEnabled>.
 */
mxEventSource.prototype.setEventsEnabled = function(value)
{
	this.eventsEnabled = value;
};

/**
 * Function: getEventSource
 * 
 * Returns <eventSource>.
 */
mxEventSource.prototype.getEventSource = function()
{
	return this.eventSource;
};

/**
 * Function: setEventSource
 * 
 * Sets <eventSource>.
 */
mxEventSource.prototype.setEventSource = function(value)
{
	this.eventSource = value;
};

/**
 * Function: addListener
 *
 * Binds the specified function to the given event name. If no event name
 * is given, then the listener is registered for all events.
 * 
 * The parameters of the listener are the sender and an <mxEventObject>.
 */
mxEventSource.prototype.addListener = function(name, funct)	// 奇数位置存储事件函数名称，奇数位置存储事件函数定义
{
	if (this.eventListeners == null)
	{
		this.eventListeners = [];
	}
	
	this.eventListeners.push(name);
	this.eventListeners.push(funct);
};

/**
 * Function: removeListener
 *
 * Removes all occurrences of the given listener from <eventListeners>.
 */
mxEventSource.prototype.removeListener = function(funct)
{
	if (this.eventListeners != null)
	{
		var i = 0;
		
		while (i < this.eventListeners.length)
		{
			if (this.eventListeners[i+1] == funct)
			{
				this.eventListeners.splice(i, 2);
			}
			else
			{
				i += 2;
			}
		}
	}
};

/**
 * Function: fireEvent
 *
 * Dispatches the given event to the listeners which are registered for
 * the event. The sender argument is optional. The current execution scope
 * ("this") is used for the listener invocation (see <mxUtils.bind>).
 * 将给定事件发送给为该事件注册的侦听器。
 * sender参数是可选的。
 * 当前执行范围（“this”）用于侦听器调用（请参见<mxutils.bind>）。
 * Example:
 *
 * (code)
 * fireEvent(new mxEventObject("eventName", key1, val1, .., keyN, valN))
 * (end)
 * 
 * Parameters:
 *
 * evt - <mxEventObject> that represents the event.
 * sender - Optional sender to be passed to the listener. Default value is
 * the return value of <getEventSource>.要传递给侦听器的可选发件者。默认值是<getEventSource>的返回值。
 */
mxEventSource.prototype.fireEvent = function(evt, sender)
{
	if (this.eventListeners != null && this.isEventsEnabled())
	{
		if (evt == null)
		{
			evt = new mxEventObject();
		}
		
		if (sender == null)
		{
			sender = this.getEventSource();
		}

		if (sender == null)
		{
			sender = this;
		}

		var args = [sender, evt];
		
		for (var i = 0; i < this.eventListeners.length; i += 2)
		{
			var listen = this.eventListeners[i];
			
			if (listen == null || listen == evt.getName())
			{
				this.eventListeners[i+1].apply(this, args);
			}
		}
	}
};
