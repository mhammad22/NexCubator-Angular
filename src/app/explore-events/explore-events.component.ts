import { Component, OnInit } from '@angular/core';
import { Events } from '../Models/Events';
import { ExploreEventsService } from './explore-events.service';

@Component({
  selector: 'app-explore-events',
  templateUrl: './explore-events.component.html',
  styleUrls: ['./explore-events.component.css'],
})
export class ExploreEventsComponent implements OnInit {
  constructor(private exploreEventsService: ExploreEventsService) {}

  JsonStringDetailEvents: any;
  res: any;

  EventsList: Events[] = [];
  event: Events;

  event_list = [
    {
      event:' Event 1',
      eventLocation:'Bangalore',
      eventDescription:'In bangalore, first event is going to happen. Please be careful about it',
      img: 'https://res.cloudinary.com/nexcubator/image/upload/v1622213152/Event%20Cover%20Images/mzfr5firxxlysrmmqqlo.jpg',
      eventStartDate: new Date('2019/05/20'),
      eventEndingDate: new Date('2019/05/24')
    },
     {
      event:' Event 2',
      eventLocation:'Dubai',
      eventDescription:'Dubai is another place to host so,e, first event is going to happen. Please be careful about it',
      img: 'https://res.cloudinary.com/nexcubator/image/upload/v1622213152/Event%20Cover%20Images/mzfr5firxxlysrmmqqlo.jpg',
      eventStartDate: new Date('2019/07/28'),
      eventEndingDate: new Date('2019/07/30')
    },
  ]

  ngOnInit(): void {
    this.exploreEventsService.getEvents().subscribe((data: Events[]) => {
      this.JsonStringDetailEvents = JSON.stringify(data);
      this.res = JSON.parse(this.JsonStringDetailEvents || []);

      console.log(this.res);

      for (var i = 0; i < this.res.length; i++) {
        this.event = new Events(
          this.res[i].EventId,
          this.res[i].Name,
          this.res[i].Location,
          this.res[i].Description,
          this.res[i].Date,
          this.res[i].Time,
          this.res[i].CoverImage,
          this.res[i].StartupID
        );

        this.event.index = i;

        //console.log(this.event);
        this.EventsList.push(this.event);
        console.log(this.EventsList);
      }
    });
    //this.slider();
  }

  slider() {
    console.log('Calling script');
    let count = $('#slider ul li').length;
    let sliderWidth = $('#slider ul li').width();
    let sliderHeight = $('#slider ul li').height();

    let totalWidth = count * sliderWidth;

    $('#slider').css({ width: sliderWidth, height: sliderHeight });

    $('#slider ul').css({ width: totalWidth, marginLeft: -sliderWidth });
    $('#slider ul li:last-child').prependTo('#slider ul');

    $('a.control_prev').on("click",function () {
      moveLeft();
    });

    function moveLeft() {
      $('#slider ul').animate(
        {
          left: +sliderWidth,
        },
        300,
        function () {
          $('#slider ul li:last-child').prependTo('#slider ul');
          $('#slider ul').css('left', '');
        }
      );
    }

    $('a.control_next').on("click",function () {
      moveRight();
    });

    function moveRight() {
      console.log("Called moveRight()");
      $('#slider ul').animate(
        {
          left: -sliderWidth,
        },
        300,
        function () {
          $('#slider ul li:first-child').appendTo('#slider ul');
          $('#slider ul').css('left', '');
        }
      );
    }

    var checkInterval;

    $('input[type="checkbox"]').on("click",function () {
      if ($(this).prop('checked') == true) {
        clearInterval(checkInterval);
        checkInterval = setInterval(function () {
          moveRight();
        }, 3000);
      } else if ($(this).prop('checked') == false) {
        console.log('Checkbox is unchecked.');
        clearInterval(checkInterval);
      }
    });
  }
}
