using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Room
{
    public class CreateRoomRequest
    {

        public string RoomName { get; set; }

        public int SeatCount { get; set; }

        public string RoomType { get; set; }

    }
}