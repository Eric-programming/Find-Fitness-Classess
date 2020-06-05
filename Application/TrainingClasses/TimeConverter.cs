using System;

namespace Application.TrainingClasses
{
    public class TimeConverter
    {
        public static int TimeToMins(string time)
        {
            var timeArr = time.Split(":");
            if (timeArr.Length == 1) return 0;
            var hour = Int32.Parse(timeArr[0]);
            var min = Int32.Parse(timeArr[1]);
            return hour * 60 + min;
        }
        public static string MinsToTime(int time)
        {
            var hours = Convert.ToInt32((time / 60));
            var min = time - (hours * 60);
            var minString = min < 10 ? min.ToString() + "0" : min.ToString();
            var hoursString = hours < 10 ? "0" + hours.ToString() : hours.ToString();
            return $"{hoursString}:{minString}";
        }
        public static int TimeNowToMins()
        {
            string time = DateTime.Now.ToString("h:mm");
            var timeArr = time.Split(":");
            return Int32.Parse(timeArr[0]) * 60 + Int32.Parse(timeArr[1]);
        }
        public static bool InvalidTime(int number)
        {
            if (number > 1440 || number < 0)
            {
                return true;
            }
            return false;
        }
    }
}