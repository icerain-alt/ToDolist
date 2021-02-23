$(function () {
    loadData()
    $("#title").on("keydown", function (event) {
        if (event.keyCode == 13) {
            // 先读取本地存储的数据
            var local = getData();
            // console.log(local);

            if ($(this).val() != '') {
                local.push({ title: $(this).val(), done: false });
                saveData(local)
                $(this).val("");

            }
            loadData();
        }
    })

    // 删除操作
    $("ol,ul").on("click", "a", function () {
        var data = getData();
        // console.log($(this).attr("id"));
        var index = $(this).attr("id");
        // 删除
        data.splice(index, 1);
        // 保存本地
        saveData(data);
        // 重新渲染页面
        loadData()
    })

    // 正在进行和已完成判断渲染
    $("ol,ul").on("click", 'input', function () {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked")
        console.log(data);
        saveData(data);
        loadData()
    })

    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist")
        if (data !== null) {
            return JSON.parse(data)
        }
        else {
            return []
        }
    }

    // 存储本地数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function loadData() {
        var data = getData();
        // console.log(data);
        // 遍历之前清空ol内元素
        $("ol").empty();
        $("ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function (i, n) {
            // console.log(n);

            if (n.done) {
                doneCount++;
                var li = $('<li><input type="checkbox" checked="checked"><p>' + n.title + '</p><a href="javascript:;" id=' + i + '></a></li > ')
                $("ul").prepend(li)
            }
            else {
                todoCount++;
                var li = $('<li><input type="checkbox"><p>' + n.title + '</p><a href="javascript:;" id=' + i + '></a></li > ')
                $("ol").prepend(li)
            }
        })
        $("#todocount").html(todoCount)
        $("#donecount").html(doneCount)
    }
})