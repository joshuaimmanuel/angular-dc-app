import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as crossfilter from 'crossfilter';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('subjectA')
  subjectADiv: ElementRef;


  subject_DA;
  mirror_subject_DB;
  subject_AG;
  name_DA;
  mirror_subject_DA;
  mirror_name_DA;
  subject_DB;
  name_DB;
  mirror_name_DB;
  subjectAChart;
  name_AG;
  subject_BG;
  name_BG;
  subjectBChart;
  nameAChart;
  nameBChart;
  markAChart;
  markBChart;
  mark_DA;
  mirror_mark_DA;
  mirror_mark_DB;
  mark_AG;
  mark_DB;
  mark_BG;

  datasetA = [
    {"Subject":"s1","Name":"A","Mark":"50"},
    {"Subject":"s2","Name":"B","Mark":"40"},
    {"Subject":"s3","Name":"C","Mark":"40"}];
        // Dataset B
  datasetB = [
    {"Subject":"s1","Name":"A","Mark":"50"},
    {"Subject":"s2","Name":"B","Mark":"40"},
    {"Subject":"C3","Name":"C","Mark":"40"}];


  ngOnInit() {
    let CFA = crossfilter(this.datasetA);
    let CFB = crossfilter(this.datasetB);


    this.subject_DA = CFA.dimension(function(d){ return d.Subject; });
    this.name_DA = CFA.dimension(function(d){ return d.Name; });
    // mirror dimensions to receive events from crossfilter B
    this.mirror_subject_DA = CFA.dimension(function(d){ return d.Subject; });
    this.mirror_name_DA = CFA.dimension(function(d){ return d.Name; });

    this.subject_DB = CFB.dimension(function(d){ return d.Subject; });
    this.name_DB = CFB.dimension(function(d){ return d.Name; });
    // mirror dimensions to receive events from crossfilter A
    this.mirror_subject_DB = CFB.dimension(function(d){ return d.Subject; });
    this.mirror_name_DB = CFB.dimension(function(d){ return d.Name; });

    this.mark_DA = CFA.dimension(function(d) { return d.Mark; });
    this.mirror_mark_DA = CFA.dimension(function(d){ return d.Mark; });
    this.mark_DB = CFB.dimension(function(d){ return d.Mark; });
    this.mirror_mark_DB = CFB.dimension(function(d){ return d.Mark; });


    // Creating the chart
    this.subjectAChart = dc.rowChart(this.subjectADiv.nativeElement);
    this.nameAChart = dc.pieChart("#nameA");
    this.markAChart = dc.rowChart("#markA");
    this.subjectBChart = dc.rowChart("#subjectB");
    this.nameBChart = dc.pieChart("#nameB");
    this.markBChart = dc.rowChart("#markB");

    // Creating the group
    this.subject_AG = this.subject_DA.group();
    this.name_AG = this.name_DA.group();
    this.mark_AG = this.mark_DA.group();

    this.subject_BG = this.subject_DB.group();
    this.name_BG = this.name_DB.group();
    this.mark_BG = this.mark_DB.group();

    this.subjectAChart
      .width(250).height(200)
      .margins({top: 5, left: 10, right: 10, bottom: 20})
      .dimension(this.mirror_dimension(this.subject_DA, this.mirror_subject_DB))
      .group(this.subject_AG)
      .gap(2)
      .title(function(d){  return d.key;})
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);

    this.nameAChart
      .width(200).height(200)
      .dimension(this.mirror_dimension(this.name_DA, this.mirror_name_DB))
      .group(this.name_AG)
      .colors(d3.scale.category20())
      .innerRadius(25);

    this.markAChart
      .width(200).height(200)
      .dimension(this.mirror_dimension(this.mark_DA, this.mirror_mark_DB))
      .group(this.mark_AG)
      .gap(2)
      .title(function(d){  return d.key;})
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);


    this.subjectBChart
      .width(250).height(200)
      .margins({top: 5, left: 10, right: 10, bottom: 20})
      .dimension(this.mirror_dimension(this.subject_DB, this.mirror_subject_DA))
      .group(this.subject_BG)
      .gap(2)
      .title(function(d){  return d.key;})
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);

    this.nameBChart
      .width(200).height(200)
      .dimension(this.mirror_dimension(this.name_DB, this.mirror_name_DA))
      .group(this.name_BG)
      .colors(d3.scale.category10())
      .innerRadius(25);

    this.markBChart
      .width(200).height(200)
      .dimension(this.mirror_dimension(this.mark_DB, this.mirror_mark_DA))
      .group(this.mark_BG)
      .gap(2)
      .title(function(d){  return d.key;})
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);

    dc.renderAll();
  }

  mirror_dimension(...args: any[]) {
    var dims = Array.prototype.slice.call(args, 0);
    function mirror(fname) {
      return function(v) {
        dims.forEach(function(dim) {
          dim[fname](v);
        });
      };
    }
    return {
      filter: mirror('filter'),
      filterExact: mirror('filterExact'),
      filterRange: mirror('filterRange'),
      filterFunction: mirror('filterFunction')
    };
  }
}
