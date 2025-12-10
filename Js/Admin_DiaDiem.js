let editId = null;

// Tải dữ liệu từ localStorage
function loadData() {
    let list = JSON.parse(localStorage.getItem("dsDiaDiem")) || [];
    let html = "";

    list.forEach((item, index) => {
        html += `
        <tr>
            <td>${item.maDiaDiem}</td>
            <td>${item.tenDiaDiem}</td>
            <td>${item.viTri}</td>
            <td>${item.moTa}</td>
            <td><img src="${item.hinhAnh}" width="70"></td>
            <td>${item.luotXem}</td>
            <td>
                <button onclick="editData(${index})">Sửa</button>
                <button onclick="deleteData(${index})">Xóa</button>
            </td>
        </tr>`;
    });

    document.getElementById("dataBody").innerHTML = html;
}

// Mở popup
document.getElementById("btnAdd").onclick = function () {
    editId = null;
    document.getElementById("popupTitle").innerText = "Thêm địa điểm";

    document.getElementById("maDiaDiem").value = "";
    document.getElementById("tenDiaDiem").value = "";
    document.getElementById("viTri").value = "";
    document.getElementById("moTa").value = "";
    document.getElementById("hinhAnh").value = "";
    document.getElementById("luotXem").value = "";

    document.getElementById("popup").classList.remove("hidden");
};

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

// Lưu dữ liệu
function saveData() {
    let item = {
        maDiaDiem: maDiaDiem.value,
        tenDiaDiem: tenDiaDiem.value,
        viTri: viTri.value,
        moTa: moTa.value,
        hinhAnh: hinhAnh.value,
        luotXem: luotXem.value
    };

    let list = JSON.parse(localStorage.getItem("dsDiaDiem")) || [];

    if (editId === null) {
        list.push(item);
    } else {
        list[editId] = item;
    }

    localStorage.setItem("dsDiaDiem", JSON.stringify(list));
    closePopup();
    loadData();
}

// Sửa
function editData(id) {
    let list = JSON.parse(localStorage.getItem("dsDiaDiem")) || [];
    let item = list[id];
    editId = id;

    document.getElementById("popupTitle").innerText = "Sửa địa điểm";

    maDiaDiem.value = item.maDiaDiem;
    tenDiaDiem.value = item.tenDiaDiem;
    viTri.value = item.viTri;
    moTa.value = item.moTa;
    hinhAnh.value = item.hinhAnh;
    luotXem.value = item.luotXem;

    document.getElementById("popup").classList.remove("hidden");
}

// Xóa
function deleteData(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        let list = JSON.parse(localStorage.getItem("dsDiaDiem")) || [];
        list.splice(id, 1);
        localStorage.setItem("dsDiaDiem", JSON.stringify(list));
        loadData();
    }
}

// Khởi tạo
loadData();
