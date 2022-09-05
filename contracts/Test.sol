// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract SimpleStore {
    struct Item {
        uint256 price;
        uint256 units;
    }

    Item[] public items;

    function newItem(uint256 _price, uint256 _units) public {
        Item memory item = Item(_price, _units);
        items.push(item);
    }

    function getUsingStorage(uint256 _itemIdx)
        public
        view
        returns (
            // set to non-view to estimate gas
            uint256
        )
    {
        Item storage item = items[_itemIdx];
        return item.units;
    }

    function getUsingMemory(uint256 _itemIdx)
        public
        view
        returns (
            // set to non-view to estimate gas
            uint256
        )
    {
        Item memory item = items[_itemIdx];
        return item.units;
    }

    function addItemUsingStorage(uint256 _itemIdx, uint256 _units) public {
        Item storage item = items[_itemIdx];
        item.units += _units;
    }

    function addItemUsingMemory(uint256 _itemIdx, uint256 _units)
        public
        view
    // set to non-view to estimate gas
    {
        Item memory item = items[_itemIdx];
        item.units += _units;
    }
}
